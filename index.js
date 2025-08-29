const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint at /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array."
      });
    }

    // Process the data
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    data.forEach(item => {
      const strItem = String(item);
      
      // Check if item is a number
      if (/^\d+$/.test(strItem)) {
        const num = parseInt(strItem);
        if (num % 2 === 0) {
          evenNumbers.push(strItem);
        } else {
          oddNumbers.push(strItem);
        }
        sum += num;
      } 
      // Check if item is an alphabet
      else if (/^[a-zA-Z]+$/.test(strItem)) {
        // Convert to uppercase and push to alphabets array
        alphabets.push(strItem.toUpperCase());
      } 
      // If not a number or alphabet, it's a special character
      else {
        specialCharacters.push(strItem);
      }
    });

    // Create concatenated string in reverse order with alternating caps
    const reversedAlphabets = [...alphabets].reverse();
    let concatString = '';
    
    for (let i = 0; i < reversedAlphabets.length; i++) {
      const word = reversedAlphabets[i];
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        if ((i + j) % 2 === 0) {
          concatString += char.toUpperCase();
        } else {
          concatString += char.toLowerCase();
        }
      }
    }

    // Prepare response
    const response = {
      is_success: true,
      user_id: "shreya_goyal_07082004", 
      email: "shreyagoyal0708@gmail.com", 
      roll_number: "22BAI1217", 
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('BFHL API is running. Use POST /bfhl to interact with the API.');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;