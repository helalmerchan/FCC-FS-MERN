# MERN-Stack project that used following process and packages

- chakra-ui 
- react-icons
- react-router-dom
- zustand state managment

<!-- This is a builtin node package that allows us to use path and following code for deploying code to production-->
```javascript
import path from "path";

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
```
