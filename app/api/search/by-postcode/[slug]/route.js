
import path from 'path';
import { promises as fs } from 'fs';
// Handle GET request
export async function GET(request, context) {

    let finalData;

    try {
        // Get data file path
        const dataPath = path.join(process.cwd(), 'json');
        // Reading the data file, maybe can also load with fetch()? but file size is quite big might have performance issue.
        const fileContents = await fs.readFile(dataPath + '/data.json', 'utf8');
        // Convert to json format
        const data = JSON.parse(fileContents);

        // Get the query parameter
        const param = context.params.slug;

        // Get postcode spliting by comma ,
        const postcodes = param.split(',');

        // Filter data to check if the postcodes get from get request exist.
        const filteredData = data.filter(item => postcodes.includes(item.postcode));

        // Validate postcode only allow numbers
        if(postcodes.every(item => !isNaN(item))) {
            // If valid but nothing found return 404
            if(filteredData.length === 0) {
                return Response.json({
                    code: "404",
                    error: "Not Found",
                    message: "The requested resource was not found on the server."
                }, {
                    status: 404 // Send browser 404
                })
            }
        }
        else {
            return Response.json({
                code: "400",
                error: "Bad Request",
                message: "Invalid request parameters. Please ensure that the input is correctly formatted and try again."
            }, {
                status: 400 // Send browser 400
            })
        }

        // Getting final data with required fields
        finalData = filteredData.map(({ state, postcode, locality }) => ({ state, postcode, locality }));
    }
    catch(error) {
        // Handle error if file cannot be loaded
        console.error('Error while reading file: ', error);
        return Response.json({
            code: "500",
            error: "Internal Server Error",
            message: "The Server currently unable to handle the request. Please try again later"
        }, {
            status: 500 // Send browser 500
        })
    }

    return Response.json(finalData, {
        status: 200 // Send browser 200
    })
}

// Handle POST request
export async function POST(request) {
    return Response.json({
        code: "405",
        error: "Method Not Allowed",
        message: "The request HTTP method is not allowed."
    }, {
        status: 405 // Send browser 405
    })
}

