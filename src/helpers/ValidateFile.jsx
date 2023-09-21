export const ValidateFile = (file) => {
    let validated = false;
    if (file != '')
    {
        let fileSplit = file.split('.');
        let fileExtension = fileSplit[1];
        
        if ((fileExtension == 'png') ||
            (fileExtension == 'jpg') ||
            (fileExtension == 'jpeg') ||
            (fileExtension == 'gif'))
        {
            validated = true;
        }
    }

    return validated;
}
