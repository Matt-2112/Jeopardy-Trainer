const apiController = {};

apiController.random = async (req, res, next) => {

    try{
        // console.log('hi')
        const data = (await fetch('http://jservice.io/api/random'));
        // console.log('mid');
        const clue = await data.json();
        console.log(data);

        res.send(data)
    }
    catch(err) {
        err.log = 'error fetching random';
        err.message = 'error fetching random'
        return next(err);
    }
}


module.exports = apiController;