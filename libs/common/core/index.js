/**
 * Created by wangkehan on 16/10/17.
 */

import './w/prototype';

export * from './w/domHelper';
export * from './w/utilHelper';
export * from './w/net';

import getRefCounter from './w/refCounter';
import privatePart from './w/privatePart';

export { getRefCounter, privatePart };

export const qiniuHost = "//cdn1.zouke.com";
