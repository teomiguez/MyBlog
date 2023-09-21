export const ValidateData = (file, title, content) => {
    let validated = false;

    if ((file != '') && (title != '') && (content != ''))
    {
        validated = true;
    }

    return validated;
}
