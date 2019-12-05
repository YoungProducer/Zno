const getIndecies = files => files.map(file => Number(file.slice(0, file.indexOf('_'))));

export default files => {
    const indecies = getIndecies(files);
    return [...Array(indecies.length)].map((e, index) => {
        return files[indecies.indexOf(index + 1)];
    });
};
