import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";
const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async ({ buffer, fileName }) => {
  const res = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName,
    folder: "snitch",
  });
  return res;
};
