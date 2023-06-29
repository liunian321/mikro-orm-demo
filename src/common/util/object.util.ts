import { isEmpty } from 'lodash';

export class ObjectUtil {
  static filterUndefinedProperties(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => !isEmpty(value)),
    );
  }
}
