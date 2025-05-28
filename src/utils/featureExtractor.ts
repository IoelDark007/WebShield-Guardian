import { parse } from 'tldts';

interface DomainInfo {
    domain: string;
    subdomain: string;
    publicSuffix: string;
}

export function extractDomain(url: string): DomainInfo {
    try {
        const parsed = parse(url);
        return {
            domain: parsed.domain || '',
            subdomain: parsed.subdomain || '',
            publicSuffix: parsed.publicSuffix || ''
        };
    } catch (error) {
        console.error("Domain extraction failed:", error);
        return {
            domain: '',
            subdomain: '',
            publicSuffix: ''
        };
    }
}

export default extractDomain;
