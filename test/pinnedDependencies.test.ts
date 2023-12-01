import * as fs from 'fs';
import pinnedDependencies from '../src/pinnedDependencies'; 

jest.mock('fs');

describe('pinnedDependencies', () => {
    const mockReadFileSync = fs.readFileSync as jest.Mock;

    it('calculates fraction of pinned dependencies correctly', () => {
        const mockPackageJson = JSON.stringify({
            dependencies: {
                "lib1": "1.0.0",
                "lib2": "^2.3.4",
                "lib3": "3.4.x"
            }
        });
        mockReadFileSync.mockReturnValue(mockPackageJson);

        const result = pinnedDependencies('dummy/path/package.json');
        expect(result).toEqual(1); // lib1 and lib2 are considered pinned
    });

    it('returns 1 when there are no dependencies', () => {
        const mockPackageJson = JSON.stringify({
            dependencies: {}
        });
        mockReadFileSync.mockReturnValue(mockPackageJson);

        const result = pinnedDependencies('dummy/path/package.json');
        expect(result).toEqual(1);
    });

    it('handles absence of dependencies field', () => {
        const mockPackageJson = JSON.stringify({});
        mockReadFileSync.mockReturnValue(mockPackageJson);

        const result = pinnedDependencies('dummy/path/package.json');
        expect(result).toEqual(1);
    });

});
