import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { InvitePoc } from '../../user/entities/invite-poc.entity';
import { InviteVol } from '../../user/entities/invite-vol.entity';
import { Relation } from '../../user/entities/relation.entity';

const entities = [SessionEntity, User, InvitePoc, InviteVol, Relation];
export default entities;

export { SessionEntity, User };
