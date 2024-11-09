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

export const linkedin_scraper = async (req , res) =>{
    const userId = req.session.userId;
    
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated"});

    const {cookie , companyName} = req.body;
    
    if(!cookie) return res.status(401).json({success: true, message: "Cookies not found"});
    if(!companyName) return res.status(401).json({success: true , message: "Please enter a company name"})

    const response = await axios.post(process.env.LINKEDIN_SCRAPER_ULR , {cookie ,companyName})

    if (response.status !== 200) return res.status(response.status).json({ success: false, message: "Failed to fetch data from the target API." });
    res.status(200).json({ success: true, data: response.data });   
}