class FileToString {
    static async convert(file) {
        return await fetch(file).then((response) => response.text());
    }
}

export default FileToString;
