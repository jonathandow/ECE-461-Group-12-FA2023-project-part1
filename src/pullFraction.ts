import axios from 'axios';

const pullFraction = async (repo : string): Promise<number> => {
    const url = `https://api.github.com/repos/${repo}/pulls?state=closed`;
    try {
        const response = await axios.get(url);
        const pullReq = response.data;
        let reviewedPull = 0;

        for (const p of pullReq) {
            if (p.merged_at && p.review_comments > 0) {
                reviewedPull++;
            }
        }

        return pullReq.length === 0 ? 1 : reviewedPull / pullReq.length;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

const repo = 'repo';
export default pullFraction;