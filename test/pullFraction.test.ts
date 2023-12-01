import axios from 'axios';
import pullFraction from '../src/pullFraction'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('pullFraction', () => {
    it('calculates the fraction correctly', async () => {
        mockedAxios.get.mockResolvedValue({
            data: [
                { merged_at: '2021-01-01', review_comments: 2 },
                { merged_at: '2021-01-02', review_comments: 0 },
                { merged_at: null, review_comments: 1 },
            ],
        });

        const repo = 'some/repo';
        const result = await pullFraction(repo);
        expect(result).toEqual(1/3); // 1 out of 2 merged PRs has review comments
    });

    it('returns 1 when there are no pull requests', async () => {
        mockedAxios.get.mockResolvedValue({ data: [] });

        const repo = 'empty/repo';
        const result = await pullFraction(repo);
        expect(result).toEqual(1);
    });

    it('returns 0 on API error', async () => {
        mockedAxios.get.mockRejectedValue(new Error('API Error'));

        const repo = 'error/repo';
        const result = await pullFraction(repo);
        expect(result).toEqual(0);
    });
});