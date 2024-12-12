import { registrationStatusOptions } from './registration';
import { postStatusOptions } from './post';
import { linkStatusOptions } from './link';
import { linkVerificationStatusOptions } from './link-verification';
import { indexationStatusOptions } from './indexation';
import { processStatusOptions } from './process';
import { forumStatusOptions } from './forum';

export const TASK_STATUS_OPTIONS = {
  registration: registrationStatusOptions,
  post: postStatusOptions,
  link: linkStatusOptions,
  linkVerification: linkVerificationStatusOptions,
  indexation: indexationStatusOptions,
  process: processStatusOptions,
  forum: forumStatusOptions
};

export {
  registrationStatusOptions,
  postStatusOptions,
  linkStatusOptions,
  linkVerificationStatusOptions,
  indexationStatusOptions,
  processStatusOptions,
  forumStatusOptions
};