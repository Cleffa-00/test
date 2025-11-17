import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// 邮件发送辅助函数
export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      subject: '欢迎加入我们！',
      html: `
        <h1>欢迎，${name}！</h1>
        <p>感谢您注册我们的服务。</p>
        <p>如果您有任何问题，请随时联系我们。</p>
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      subject: '重置密码',
      html: `
        <h1>重置密码</h1>
        <p>点击下面的链接重置您的密码：</p>
        <a href="${resetLink}">重置密码</a>
        <p>如果您没有请求重置密码，请忽略此邮件。</p>
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
