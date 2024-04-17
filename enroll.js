const sdk = require("microsoft-cognitiveservices-speech-sdk");

async function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}

async function enrollProfile(speechConfig,subscriptionKey, serviceRegion, locale, enrollFile) {
    const client = new sdk.VoiceProfileClient(speechConfig);

    try {
        const profile = await client.createProfileAsync(sdk.VoiceProfileType.TextIndependentIdentification, locale);
        console.log(profil);
        const enrollFileBuffer = await readFile(enrollFile);
        const audioConfig = sdk.AudioConfig.fromAudioFileInput(enrollFileBuffer);

        console.log(`Profile id: ${profile.profileId} created, now enrolling using file: ${enrollFile.name}`);
        const enrollResult = await client.enrollProfileAsync(profile, audioConfig);

        console.log(`(Enrollment result) Reason: ${sdk.ResultReason[enrollResult.reason]}`);
        
        return enrollResult;
    } catch (error) {
        console.error('Error during enrollment:', error);
        throw error;
    }
}

module.exports = enrollProfile;
