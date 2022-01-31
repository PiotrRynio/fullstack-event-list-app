import { EntityIdGenerator } from '../../../../shared/Module/core/application/EntityIdGenerator';

export function EntityIdGeneratorStub(alwaysGenerate: string): EntityIdGenerator {
  return {
    generate(): string {
      return alwaysGenerate;
    },
  };
}
