import { ForumStatus } from './forum-status';
import { TaskStatus, LinkVerificationStatus, IndexationStatus } from './task-status';

export interface Forum {
  id?: string;
  url: string;
  cleanUrl: string;
  loginUrl?: string;
  registrationUrl?: string;
  topics: string[];
  status: ForumStatus;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id?: string;
  forumId: string;
  emailId: string;
  emailAlias?: string | null;
  websiteId: string;
  username: string;
  password: string;
  registrationStatus: TaskStatus;
  postStatus: TaskStatus;
  linkStatus: TaskStatus;
  linkVerificationStatus: LinkVerificationStatus;
  threadUrl1?: string;
  threadUrl2?: string;
  threadUrl3?: string;
  postUrl?: string;
  messageToPost?: string;
  comment?: string;
  indexationStatus: IndexationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Email {
  id?: string;
  webmailUrl: string;
  email: string;
  password: string;
  aliases: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Website {
  id?: string;
  name: string;
  url: string;
  topic: string;
  createdAt: Date;
  updatedAt: Date;
}