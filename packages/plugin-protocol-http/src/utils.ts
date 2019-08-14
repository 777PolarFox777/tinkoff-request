import { MakeRequestResult } from '@tinkoff/request-core';
import prop from '@tinkoff/utils/object/prop';
import { Response } from 'superagent';
import { PROTOCOL_HTTP } from './constants';

// TODO: when some plugins (for example cache) break flow, plugin-http won't be called and meta will be empty
export const _getResponse = (request: MakeRequestResult): Response | void => {
    const meta = request.getInternalMeta(PROTOCOL_HTTP);

    return meta && meta.response;
};

const _getHeaders = (request: MakeRequestResult) => {
    return prop('headers', _getResponse(request));
};

export const getHeaders = (request: MakeRequestResult) => {
    const headers = _getHeaders(request);
    const result = {};

    if (headers) {
        headers.forEach((v, k) => {
            result[k] = v;
        });
    }

    return result;
};

export const getHeader = (request: MakeRequestResult, header: string) => {
    const headers = _getHeaders(request);

    return headers && headers.get(header);
};

export const getStatus = (request: MakeRequestResult) => {
    return prop('status', _getResponse(request));
};

export const abort = (request: MakeRequestResult) => {
    const meta = request.getInternalMeta(PROTOCOL_HTTP);

    return meta && meta.requestAbort();
};
