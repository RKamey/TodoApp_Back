import fs from "fs";
import path from "path";
import { envs } from "@config/envs";

interface VerificationTemplateData {
  verificationUrl: string;
  userName?: string;
  logoUrl?: string;
}

export const getVerificationTemplate = (data: VerificationTemplateData): string => {
  try {
    
    const templatePath = path.join(__dirname, '../templates/verification.html');

    if (!fs.existsSync(templatePath)) {
      console.error('Template file does not exist at:', templatePath);
      throw new Error(`Template file not found: ${templatePath}`);
    }
    
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    const {
      verificationUrl,
      userName = 'Usuario',
      logoUrl = `${envs.BACKEND_URL}/assets/images/taskify-logo.png`
    } = data;
        
    htmlTemplate = htmlTemplate
      .replace(/\{\{verificationUrl\}\}/g, verificationUrl)
      .replace(/\{\{userName\}\}/g, userName)
      .replace(/\{\{logoUrl\}\}/g, logoUrl);
    
    return htmlTemplate;
  } catch (error) {
    console.error('Error in getVerificationTemplate:', error);
    throw new Error('Failed to generate verification email template');
  }
};
