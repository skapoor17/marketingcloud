import fs from 'fs';
import path from 'path';

/**
 * Render Config
 * @param req
 * @param res
 */
export async function config(req, res) {
    try {
        console.log("req.headers.host || req.headers.origin---", req.headers.host);
        const domain = req.headers.host || req.headers.origin;
        const file = path.join(__dirname, '../..', 'public', 'config-template.json');

        const configTemplate = fs.readFileSync(file, 'utf-8');
        var config = JSON.parse(configTemplate.replace(/\$DOMAIN/g, domain));
        res.json(config);
    } catch (e) {
        console.log("error in the config part", e);
        const obj = {
            error_type: "General Error",
            error_code: "400",
            error_message: "Error in catch block of the config load"
        }
        new errorRecord(obj).save((err, doc) => {
            console.log("i am in save mode of config11", " err ", err, " doc ", doc);
        });
        res.render('error', {
            title: 'Custom Activity'
        });
    }
}

/**
 * Render UI
 * @param req
 * @param res
 */
export async function ui(req, res) {
    console.log("heee")
    try {
        res.render('index', {
            title: 'Custom Activity'
        });


    } catch (e) {
        res.render('error', {
            title: 'Custom Activity'
        });
    }
};

export async function errorLogs(req, res) {
    try {
        res.render('errorlog', {
            title: 'Custom Activity'
        });
    } catch (e) {
        console.log("in the catch block of the intialUi route", e);
        res.render('errorlog', {
            title: 'Custom Activity'
        });
    }
}

/*
 * POST Handler for /execute/ route of Activity.
 */
export async function execute(req, res) {

    try {
        if (req && req.body) {

            //console.log("For Execute function calling", req.body);
            const data = req.body;

            if (data && data.inArguments && Array.isArray(data.inArguments) && data.inArguments.length > 0) {

                let requestBody = data.inArguments[0];
                console.log(">>>>>>>>>",requestBody)

                if (requestBody) {
                    res.status(200).send({
                        status: 'ok',
                    });
                } else {
                    res.status(200).send({
                        status: 'ok',
                    });
                }
            } else {
                res.status(200).send({
                    status: 'ok',
                });
            }
        } else {
            res.status(200).send({
                status: 'ok',
            });
        }
    } catch (e) {
        res.status(200).send({
            status: 'ok',
        });
    }
}

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function save(req, res) {
    try {
        console.log("in save routes");
        res.status(200).send({
            status: 'ok',
        });
    } catch (e) {
        console.log("in save function", e);
        res.status(200).send({
            status: 'ok',
        });
    }
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
export async function publish(req, res) {
    try {
        console.log("in publish routes");
        res.status(200).send({
            status: 'ok',
        });
    } catch (e) {
        console.log("in publish function", e);
        res.status(200).send({
            status: 'ok',
        });
    }
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
export async function validate(req, res) {
    try {
        console.log("in validate routes");
        res.status(200).send({
            status: 'ok',
        });
    } catch (e) {
        console.log("in the validate function", e);
        res.status(200).send({
            status: 'ok',
        });
    }
};
