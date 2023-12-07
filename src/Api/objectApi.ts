import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  NoSuchKey,
  PutObjectCommand,
  PutObjectOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { ObjectList } from "aws-sdk/clients/s3";
import { SettingsProps } from "../utils/sessionStorage";
import { REGION } from "../utils/s3.config";

export const getAllObjects = async (
  client: S3Client,
  bucket: string,
  prefix?: string,
  size?: number
): Promise<ObjectList> => {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix || "",
    ...(size ? { MaxKeys: size } : {}),
  });

  try {
    let isTruncated = true;

    let contents: ObjectList = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);

      if (Contents) {
        contents = [...contents, ...Contents];
      }

      isTruncated = IsTruncated!;
      command.input.ContinuationToken = NextContinuationToken;
    }

    return contents;
  } catch (err) {
    throw err;
  }
};

export const putObject = async (
  client: S3Client,
  bucket: string,
  key: string,
  body?: string
): Promise<PutObjectOutput> => {
  const input = {
    Bucket: bucket,
    Key: key,
    ...(body ? { Body: body } : {}),
  };
  const command = new PutObjectCommand(input);
  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteObject = async (
  client: S3Client,
  bucket: string,
  key: string
) => {
  try {
    const response = await getAllObjects(client, bucket, key);

    const objectsToDelete = response.map((object) => ({
      Key: object.Key,
    }));

    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: objectsToDelete,
      },
    });

    await client.send(command);
  } catch (err) {
    console.error(err);
    throw err;
  }

  try {
  } catch (err) {
    console.error(err);
  }
};

export const verifyBucket = async (data: SettingsProps): Promise<S3Client> => {
  const client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: data.accessKeyId,
      secretAccessKey: data.secretAccessKey,
    },
  });

  try {
    await getAllObjects(client, data.bucket, undefined, 1);

    return client;
  } catch (err) {
    if (err instanceof NoSuchKey) {
      return client;
    }
    throw err;
  }
};
