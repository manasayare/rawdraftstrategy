// Every path is handled by the client shell mounted in the root layout, which reads the
// path and picks the page, as Raw Draft.dc.html did with the hash. The shell lives in the
// layout so it persists across navigations instead of remounting per route.
export default function Page() {
  return null;
}
