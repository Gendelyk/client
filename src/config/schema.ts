import { InferType, object, string } from 'yup';

const envConfigSchema = object({
  NEXT_PUBLIC_API_URL: string().required(),
});

// !IMPORTANT
// * should necessary be declared the way below, otherwise variables will be undefined
// * See more https://docs.expo.dev/guides/environment-variables/#how-to-read-from-environment-variables
export const envConfig = envConfigSchema.validateSync({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
});

export type Config = InferType<typeof envConfigSchema>;
