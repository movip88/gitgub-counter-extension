const axios = require('axios');
const _ = require('lodash');

async function getFilesRepository(repoInfo) {
    const dataRepo = await getFiles(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/git/trees/master`);
    const files = [];
    await iterateFiles(files, dataRepo.data.tree);

    const result = _.groupBy(files);

    for(let key of Object.keys(result)) {
        result[key] = result[key].length;
    }

    return result
}

async function iterateFiles(files, data) {
    for(let tmpFile of data) {
        if (tmpFile.type === 'blob') {
            files.push(tmpFile.path.split('.').pop());
        } else {
            const dataDirectory = await getFiles(tmpFile.url);
            await iterateFiles(files, dataDirectory.data.tree);
        }
    }
}

async function getFiles(url) {
    let config = {
        headers: {
            Authorization: 'token TOKEN_GITHUB',
        }
      }
    return await axios.get(url, config);
}

module.exports = {
    getFilesRepository
}