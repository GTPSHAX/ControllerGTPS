const { execSync } = require("child_process");

class Functions {
    print(text) {
        console.log("[Controller] >> " + text);
    };
    async cekModule(name) {
        try {
            require.resolve(name);
            this.print(`${name} Loaded!`);
        } catch (error) {
            this.print(`Downloading ${name}...`);
            try {
                await execSync(`npm install ${name}`);
                this.print(`${name} downloaded!`);
            } catch (error) {
                this.print(`Error installing ${name}: ${error}`);
            }
        }
    }
}

module.exports = {Functions, execSync};