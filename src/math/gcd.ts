export function gcd(a:bigint,b:bigint):bigint{
    if(!a&&!b)return 1n;
    return b?gcd(b,a%b):a;
}