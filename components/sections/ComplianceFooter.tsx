export default function ComplianceFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-deep-navy border-t border-steel-gray/10 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-display font-bold text-pure-white text-base sm:text-lg tracking-wide">
            PRIME AMBITION
          </span>
          <span className="text-volt-red font-display font-bold text-base sm:text-lg">MARKETING</span>
        </div>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-5 sm:gap-6">
          <a href="/privacy-policy" className="text-steel-gray text-xs font-body hover:text-pure-white transition tap-target">
            Privacy Policy
          </a>
          <span className="text-steel-gray/30 text-xs">|</span>
          <a href="/terms" className="text-steel-gray text-xs font-body hover:text-pure-white transition tap-target">
            Terms &amp; Conditions
          </a>
        </div>

        {/* FB disclaimer */}
        <p className="text-steel-gray text-[10px] sm:text-[11px] font-body leading-relaxed max-w-2xl mx-auto">
          This site is not a part of the Facebook website or Facebook Inc. Additionally, this site
          is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          Results shown are not typical. Individual results will vary based on many factors including
          prior experience, budget, and market conditions.
        </p>

        {/* Copyright */}
        <p className="text-steel-gray/40 text-[10px] sm:text-[11px] font-body">
          &copy; {year} Prime Ambition Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
