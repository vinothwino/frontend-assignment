export const validateSearchText = (keyCode: number) => (
    //info: A-Z
    (keyCode >= 65 && keyCode <= 90) ||
    //info: a-b
    (keyCode >= 97 && keyCode <= 122) ||
    //info: 0-9
    (keyCode >= 48 && keyCode <= 57) ||
    //info: Underscore
    (keyCode === 95)
)