import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
})

export const uploadToS3 = async (folderName, file, username) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objName = `${folderName}/${username}_${Date.now()}_${filename}`;
  const { Location } = await new AWS.S3().upload({
    Bucket: 'nomad-coffee-backend',
    Key: objName,
    ACL: "public-read",
    Body: readStream
  }).promise()
  return Location;
}