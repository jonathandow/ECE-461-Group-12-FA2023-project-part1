import * as fs from 'fs';

export const pinnedDependencies = (filePath: string): number => {
    try {
        const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const dependencies = packageJson.dependencies || {};
        const totalDependencies = Object.keys(dependencies).length;
        let pinnedCount = 0;

        for (const dep in dependencies) {
            if (dependencies.hasOwnProperty(dep)) {
                const version = dependencies[dep];
                if (/^\d+\.\d+\.\d+/.test(version) || /^\^?\d+\.\d+\./.test(version)) {
                    pinnedCount++;
                }
            }
        }

        return totalDependencies === 0 ? 1 : pinnedCount / totalDependencies;
    } catch (error) {
        console.error('Error reading file:', error);
        return 0;
    }
};

export default pinnedDependencies;
