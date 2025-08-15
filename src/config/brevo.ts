import { TransactionalEmailsApi } from "@getbrevo/brevo";
import { envs } from "./envs";

const brevoClient = new TransactionalEmailsApi();
(brevoClient as any).authentications.apiKey.apiKey = envs.BREVO_API_KEY as string;

export { brevoClient };
