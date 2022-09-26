import httpService from "./http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    get: async () => {
        const req = await httpService.get(qualityEndpoint);
        return req.data;
    }
};

export default qualityService;
