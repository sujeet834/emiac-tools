import axios from 'axios'


export const getSemrushData = async (req, res) => {
    try {
        // Retrieve the user ID from the session
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ success: false, message: 'User not authenticated' });
        const { urls } = req.body;
        console.log(urls);
        
        // Validate the URLs
        if (!urls || urls.length === 0) {
            return res.status(400).json({ success: false, message: 'No URLs provided' });
        }
        if (urls.length > 100) {
            return res.status(400).json({ success: false, message: 'You can only submit up to 100 URLs.' });
        }
        // Make a POST request to the target API with the URLs
        const response = await axios.post(process.env.SEMRUSH_API_URL, { urls });

        // Check if the target API response is valid
        if (response.status !== 200) {
            return res.status(response.status).json({ success: false, message: 'Failed to fetch data from the target API.' });
        }
        // Forward the response data from the target API to the frontend
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch data from the target API.', error: error.message });
    }
};


// Find Moz Data
export const mozData = async (req, res) => {

    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const { urls } = req.body;


    if (!urls || urls.length === 0) return res.status(401).json({ success: true, message: "No URLs provided" });
    if (urls && urls.length > 20) return res.status(401).json({ success: true, message: "You can submit only 20 Urls" });

    const response = await axios.post(process.env.MOZ_DATA_API_URL, { urls });

    if (response.status !== 200) return res.status(response.status).json({ success: false, message: "Failed to fetch data from the target API." });
    res.status(200).json({ success: true, data: response.data });
}

// 

// export const fileConvert =  async (req, res) => {
//   try {
//     // Retrieve user ID from session
//     const userId = req.session.userId;
//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }

//     // Extract fileType and convertType from request
//     const { fileType, convertType } = req.body;
//     const file = req.file; // Multer handles the uploaded file

//     // Validate the uploaded file and conversion types
//     if (!file || fileType !== 'pdf' || convertType !== 'csv') {
//       return res.status(400).json({ message: 'Invalid file type or conversion type.' });
//     }

//     // Construct the correct path to the uploaded file inside the src/uploads directory
//     const filePath = path.join(process.cwd(), 'src', 'uploads', file.filename); // Uses process.cwd() to start from the project root

//     // Log the resolved file path for debugging
//     console.log('Resolved File Path:', filePath);

//     // Check if the file exists at the constructed path
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: 'File not found at specified path.' });
//     }

//     // Read the uploaded PDF file
//     const dataBuffer = fs.readFileSync(filePath);

//     // Debugging: Log buffer size to ensure the file is being read correctly
//     console.log('Buffer Size:', dataBuffer.length);

//     // Parse the PDF to extract text
//     const pdfData = await pdfParse(dataBuffer);

//     // Split text into rows and columns based on new lines and spaces
//     const rows = pdfData.text
//       .split('\n')
//       .map((line) => line.trim().split(/\s+/));

//     // Convert extracted data into CSV format
//     const csv = Papa.unparse(rows);

//     // Optional: Save the CSV file to the server (if needed)
//     const csvFilePath = filePath.replace('.pdf', '.csv');
//     fs.writeFileSync(csvFilePath, csv);

//     // Send CSV content back to the frontend
//     res.json({ csvContent: csv, csvFilePath });

//     // Clean up: Delete the original PDF file after processing
//     fs.unlinkSync(filePath);
//   } catch (error) {
//     console.error('Conversion error:', error);
//     res.status(500).json({ message: 'File conversion failed', error: error.message });
//   }
// };