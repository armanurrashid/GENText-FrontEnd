export let currentFile = 0;

export const setFileID=(value)=>{
    currentFile = value;
}

export const getFileID=()=>{
    return currentFile;
}
