import jwt from "jsonwebtoken";



async function AuthService(request, response, next){
    try{
        const token = request.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, "test");
            request.userId = decodedData?.id;
            // console.log(decodedData);
        } else {
            decodedData = jwt.decode(token);
            request.userId = decodedData?.sub;
            // console.log(decodedData);
        }
        next();
    } catch (error) {
        console.log(error);
        response.json({message: "You are not allowed. Register or login"})
    }
}


export default AuthService;





