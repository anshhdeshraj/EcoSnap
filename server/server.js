import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "API_KEY";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const logDir = path.join(__dirname, "logs");
const uploadsDir = path.join(__dirname, "uploads");

[logDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Create a write stream for logs
const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), {
    flags: "a",
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname) || '.jpg';
        const filename = `ecosnap-${timestamp}${extension}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Store analysis results in memory (for production, best to use a database)
const analysisResults = new Map();

// Middleware
app.use(express.json());

// Enable CORS for React Native
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Logging
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

async function analyzeImageWithGemini(imagePath) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const imageData = fs.readFileSync(imagePath);
        const imageBase64 = imageData.toString('base64');

        const prompt = `
        You are an expert environmental analyst. Analyze this image comprehensively for environmental impact assessment. 

        CRITICAL REQUIREMENTS:
        1. If the image contains a living person's face or body, set "containsLivingPerson": true and "isValidItem": false
        2. If the image is unclear, blurry, or doesn't contain analyzable items, set "isValidItem": false
        3. Provide realistic, research-based values for all metrics
        4. Return ONLY valid JSON with no additional text or markdown formatting
        5. Try to give grades to products optimistically and positively

        Return your analysis in this EXACT JSON format:

        {
            "isValidItem": true,
            "containsLivingPerson": false,
            "productIdentification": {
                "name": "Specific product name",
                "category": "food/plastic/electronics/textile/packaging/beverage/cosmetic/automotive/furniture/other",
                "subCategory": "More specific classification",
                "isFood": true,
                "confidence": 0.95,
                "brandVisible": true,
                "brandName": "Brand if visible or null"
            },
            "environmentalImpact": {
                "carbonFootprint": {
                    "value": 2.5,
                    "unit": "kg CO2e",
                    "description": "Detailed explanation of carbon emissions",
                    "lifecycle": "cradle-to-grave/cradle-to-gate",
                    "scope": "production/transportation/disposal/total"
                },
                "offsetRequirement": {
                    "treesToPlant": 3,
                    "timeToOffset": "2 years",
                    "description": "Trees needed to offset carbon footprint over specified time",
                    "offsetCost": "$5-15 USD"
                },
                "ecologicalHarm": {
                    "severity": "low/moderate/high/critical",
                    "impacts": ["biodiversity loss", "soil degradation", "water pollution"],
                    "description": "Detailed ecological impact assessment",
                    "affectedEcosystems": ["forest", "marine", "freshwater", "agricultural"]
                }
            },
            "sustainability": {
                "recyclable": true,
                "biodegradable": false,
                "renewableSource": true,
                "sustainabilityScore": 7.2,
                "scoreExplanation": "Detailed explanation of sustainability score (0-10)",
                "certifications": ["FSC", "USDA Organic", "Fair Trade"],
                "circularEconomy": "reusable/recyclable/biodegradable/waste"
            },
            "production": {
                "materials": ["primary material", "secondary material"],
                "primaryMaterial": "Main material composition",
                "process": "How it's manufactured/grown/obtained",
                "energyIntensive": true,
                "waterUsage": "high/medium/low",
                "landUse": "Description of land impact and area required",
                "transportDistance": "Local/Regional/International",
                "seasonality": "Year-round/Seasonal/Peak season months"
            },
            "foodSpecific": {
                "ingredients": ["ingredient1", "ingredient2"],
                "nutritionalImpact": "Brief nutritional assessment",
                "processingLevel": "raw/minimally processed/processed/ultra-processed",
                "preservatives": ["preservative1", "preservative2"],
                "packagingType": "plastic/glass/cardboard/metal/biodegradable",
                "shelfLife": "Duration and storage requirements",
                "organicStatus": "organic/conventional/unknown",
                "localAvailability": "widely available/regional/imported",
                "animalWelfare": "applicable rating or not applicable"
            },
            "healthImpact": {
                "humanHealth": "positive/neutral/negative",
                "healthConcerns": ["concern1", "concern2"],
                "nutritionalValue": "high/moderate/low/not applicable",
                "allergens": ["allergen1", "allergen2"],
                "additives": ["additive1", "additive2"]
            },
            "alternatives": [
                {
                    "name": "Alternative product name",
                    "description": "Why it's environmentally better",
                    "carbonReduction": "50%",
                    "availability": "widely available/limited/online only",
                    "costComparison": "cheaper/similar/more expensive",
                    "sustainabilityImprovement": "specific improvements"
                }
            ],
            "recommendations": [
                "Specific actionable recommendation 1",
                "Specific actionable recommendation 2", 
                "Specific actionable recommendation 3"
            ],
            "metrics": {
                "waterFootprint": "500L per unit",
                "energyFootprint": "2.5 kWh per unit",
                "wasteGenerated": "50g packaging waste",
                "packagingImpact": "moderate/high/low",
                "transportEmissions": "0.5 kg CO2e",
                "endOfLifeImpact": "recyclable/landfill/compostable"
            },
            "economicImpact": {
                "fairTrade": true,
                "laborConditions": "ethical/concerning/unknown",
                "localEconomy": "supports/neutral/harms",
                "pricePoint": "budget/mid-range/premium"
            },
            "overallAssessment": {
                "environmentalGrade": "A-F grade",
                "keyStrengths": ["strength1", "strength2"],
                "keyWeaknesses": ["weakness1", "weakness2"],
                "improvementPotential": "Description of how product could be improved"
            }
        }

        IMPORTANT: 
        - All numerical values must be realistic and research-based
        - Provide specific, actionable recommendations
        - Grade products honestly - don't inflate scores
        - For unclear images, set isValidItem to false
        - For images with people, set containsLivingPerson to true
        - Return ONLY the JSON object, no other text
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: getImageMimeType(imagePath)
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        let cleanText = text.trim();

        if (cleanText.startsWith('```json')) {
            cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON found in Gemini response");
        }

        let analysisData;
        try {
            analysisData = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            throw new Error("Invalid JSON format in Gemini response");
        }

        // Validate the response structure
        if (!analysisData.hasOwnProperty('isValidItem')) {
            throw new Error("Invalid analysis structure received from Gemini");
        }

        console.log('Gemini analysis completed successfully');
        console.log(analysisData)
        return analysisData;

    } catch (error) {
        console.error('Gemini analysis error:', error);

        // Return comprehensive fallback analysis
        return {
            isValidItem: true,
            containsLivingPerson: false,
            productIdentification: {
                name: "Unidentified Item",
                category: "other",
                subCategory: "Unknown",
                isFood: false,
                confidence: 0.3,
                brandVisible: false,
                brandName: null
            },
            environmentalImpact: {
                carbonFootprint: {
                    value: 1.0,
                    unit: "kg CO2e",
                    description: "Estimated carbon footprint (analysis failed)",
                    lifecycle: "total",
                    scope: "total"
                },
                offsetRequirement: {
                    treesToPlant: 1,
                    timeToOffset: "1 year",
                    description: "Estimated offset requirement",
                    offsetCost: "$2-5 USD"
                },
                ecologicalHarm: {
                    severity: "moderate",
                    impacts: ["Unknown environmental impact"],
                    description: "Unable to determine specific impacts due to analysis failure",
                    affectedEcosystems: ["unknown"]
                }
            },
            sustainability: {
                recyclable: false,
                biodegradable: false,
                renewableSource: false,
                sustainabilityScore: 5.0,
                scoreExplanation: "Default score due to analysis failure",
                certifications: [],
                circularEconomy: "unknown"
            },
            production: {
                materials: ["Unknown materials"],
                primaryMaterial: "Unknown",
                process: "Unable to determine production process",
                energyIntensive: false,
                waterUsage: "medium",
                landUse: "Unknown land impact",
                transportDistance: "Unknown",
                seasonality: "Unknown"
            },
            foodSpecific: {
                ingredients: [],
                nutritionalImpact: "Not applicable",
                processingLevel: "unknown",
                preservatives: [],
                packagingType: "unknown",
                shelfLife: "Unknown",
                organicStatus: "unknown",
                localAvailability: "Unknown",
                animalWelfare: "not applicable"
            },
            healthImpact: {
                humanHealth: "neutral",
                healthConcerns: [],
                nutritionalValue: "not applicable",
                allergens: [],
                additives: []
            },
            alternatives: [
                {
                    name: "Eco-friendly alternatives",
                    description: "Look for certified sustainable options in the same category",
                    carbonReduction: "Variable",
                    availability: "varies by location",
                    costComparison: "varies",
                    sustainabilityImprovement: "Reduced environmental impact"
                }
            ],
            recommendations: [
                "Research sustainable alternatives in this product category",
                "Look for local and organic options when available",
                "Consider reducing overall consumption",
                "Check for recycling options in your area"
            ],
            metrics: {
                waterFootprint: "Unknown",
                energyFootprint: "Unknown",
                wasteGenerated: "Unknown",
                packagingImpact: "unknown",
                transportEmissions: "Unknown",
                endOfLifeImpact: "unknown"
            },
            economicImpact: {
                fairTrade: false,
                laborConditions: "unknown",
                localEconomy: "unknown",
                pricePoint: "unknown"
            },
            overallAssessment: {
                environmentalGrade: "C",
                keyStrengths: ["Analysis unavailable"],
                keyWeaknesses: ["Unable to assess environmental impact"],
                improvementPotential: "Complete environmental analysis needed"
            },
            error: "Analysis failed: " + error.message
        };
    }
}

// Helper function to determine image MIME type
function getImageMimeType(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        default:
            return 'image/jpeg';
    }
}

// Basic routes
app.get("/", (req, res) => {
    res.json({
        message: "EcoSnap Server is running!",
        endpoints: {
            upload: "/api/upload",
            health: "/api/health",
            status: "/api/upload/:uploadId/status"
        }
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        geminiConfigured: GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE",
        model: "gemini-2.0-flash-exp"
    });
});

// Image upload endpoint
app.post("/api/upload", upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No image file provided",
                message: "Please select an image to upload"
            });
        }

        const uploadId = req.file.filename.replace(/\.[^/.]+$/, "");

        console.log('Image uploaded:', {
            uploadId,
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
        });

        // Store initial analysis state
        analysisResults.set(uploadId, {
            status: "processing",
            uploadTimestamp: new Date().toISOString(),
            filename: req.file.filename,
            originalName: req.file.originalname,
            fileSize: req.file.size,
            progress: 10
        });

        // Start background analysis
        setImmediate(async () => {
            try {
                console.log(`Starting analysis for ${uploadId}...`);

                // Update progress
                analysisResults.set(uploadId, {
                    ...analysisResults.get(uploadId),
                    progress: 30,
                    status: "analyzing"
                });

                const analysisData = await analyzeImageWithGemini(req.file.path);

                // Final update with results
                analysisResults.set(uploadId, {
                    ...analysisResults.get(uploadId),
                    status: "completed",
                    results: analysisData,
                    completedAt: new Date().toISOString(),
                    progress: 100
                });

                console.log(`Analysis completed for ${uploadId}`);

            } catch (error) {
                console.error(`Analysis failed for ${uploadId}:`, error);

                analysisResults.set(uploadId, {
                    ...analysisResults.get(uploadId),
                    status: "error",
                    error: error.message,
                    completedAt: new Date().toISOString(),
                    progress: 0
                });
            }
        });

        // Return immediate response
        res.status(200).json({
            success: true,
            uploadId,
            filename: req.file.filename,
            originalName: req.file.originalname,
            fileSize: req.file.size,
            uploadTimestamp: new Date().toISOString(),
            analysis: {
                status: "processing",
                message: "Image received successfully. Analysis in progress.",
                estimatedProcessingTime: "5-6 seconds"
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: "Upload failed",
            message: error.message || "An unexpected error occurred during upload"
        });
    }
});

// Get upload status endpoint
app.get("/api/upload/:uploadId/status", (req, res) => {
    const { uploadId } = req.params;
    const result = analysisResults.get(uploadId);

    if (!result) {
        return res.status(404).json({
            error: "Upload not found",
            message: "The specified upload ID was not found"
        });
    }

    if (result.status === "processing" || result.status === "analyzing") {
        const elapsed = Date.now() - new Date(result.uploadTimestamp).getTime();
        const estimatedProgress = Math.min(result.progress || 10 + (elapsed / 1000), 95);

        return res.json({
            uploadId,
            status: result.status,
            message: result.status === "analyzing" ? "AI analyzing environmental impact..." : "Processing image...",
            progress: estimatedProgress
        });
    }

    res.json({
        uploadId,
        status: result.status,
        progress: result.progress || (result.status === "completed" ? 100 : 0),
        results: result.results,
        error: result.error,
        completedAt: result.completedAt
    });
});

// Serve uploaded files (for development)
app.use('/uploads', express.static(uploadsDir));

// Error handlers
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: "File too large",
                message: "Image size must be less than 10MB"
            });
        }
        return res.status(400).json({
            error: "Upload error",
            message: error.message
        });
    }

    if (error.message === 'Only image files are allowed!') {
        return res.status(400).json({
            error: "Invalid file type",
            message: "Please upload an image file (jpg, png, gif, etc.)"
        });
    }

    next(error);
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({
        error: "Internal server error",
        message: "Something went wrong on the server"
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: "Not found",
        message: `Route ${req.originalUrl} not found`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 EcoSnap Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
    console.log(`📁 Logs directory: ${logDir}`);
    console.log(`🤖 Gemini 2.5 Flash: ${GEMINI_API_KEY == "API_KEY" ? 'Configured' : 'Not configured'}`);
});