import { Job, Worker } from "bullmq";
import nodemailer from "nodemailer";

console.log("WORKER STARTED ....");
interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const worker = new Worker<EmailJob>(
  "email-queue",
  async (job: Job<EmailJob>) => {
    console.log(`Email request recieved for job ${job.id}`);

    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: job.data.to,
      subject: job.data.subject!,
      text: job.data.body!,
    });
    console.log(`Email sent successfully for job ${job.id}`);
  },
  {
    connection: {
      host: "redis_cache",
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Email sent successfully for job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
