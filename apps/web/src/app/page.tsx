'use client'
import React, { useState, useEffect } from 'react';
import { Activity, Bell, BarChart3, Clock, Shield, Zap, CheckCircle2, AlertCircle, TrendingUp, Users, ArrowRight, Github, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import LoginPage from './login/page';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(Number);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const features = [
    {
      icon: Activity,
      title: "Real-Time Health Monitoring",
      description: "Track system uptime and downtime with minute-level precision using secure heartbeat checks."
    },
    {
      icon: Bell,
      title: "Intelligent Alerting",
      description: "Get notified only when it matters — alerts are deduplicated, severity-based, and cooldown-aware to prevent noise."
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Understand availability trends with uptime charts, health timelines, and incident history."
    },
    {
      icon: Clock,
      title: "Incident Lifecycle Tracking",
      description: "From detection to resolution — every incident is tracked with duration, severity, and recovery time."
    },
    {
      icon: Zap,
      title: "Configurable Alert Rules",
      description: "Customize thresholds, cooldowns, and notification preferences per system."
    }
  ];

  const steps = [
    { num: "01", title: "Register your system", desc: "Generate a secure API key and configure heartbeat intervals." },
    { num: "02", title: "Send heartbeats", desc: "Your service sends periodic pings to AutoPulse." },
    { num: "03", title: "Detect failures", desc: "Missing heartbeats trigger downtime detection automatically." },
    { num: "04", title: "Get alerted", desc: "Receive alerts via email (Slack & PagerDuty coming next)." },
    { num: "05", title: "Resolve & analyze", desc: "Track resolution time and analyze historical reliability." }
  ];

  const securityFeatures = [
    "Secure API key authentication",
    "Role-based access (Admin / User)",
    "Token-based auth with refresh handling",
    "Reliable background jobs and persistence",
    "Redis-backed queueing for heartbeat processing"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
      
      {/* Gradient orb following cursor */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(120,120,120,0.03) 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <Activity className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">AutoPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-neutral-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-neutral-400 hover:text-white transition-colors">How It Works</a>
            <a href="#security" className="text-sm text-neutral-400 hover:text-white transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href={'/login'}>
            <button className="text-sm text-neutral-400 hover:text-white transition-colors">
              Sign In
            </button>
            </Link>
            <Link href={'/dashboard'}>
            <button className="px-4 h-9 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors" >
              Dashboard
            </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 text-xs">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="text-neutral-400">Real-Time System Monitoring</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              AutoPulse
            </h1>
            
            <p className="text-2xl md:text-3xl text-neutral-400 font-light mb-4">
              Real-Time System Monitoring
            </p>
            <p className="text-2xl md:text-3xl text-neutral-400 font-light mb-12">
              Made Simple
            </p>
            
            <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto">
              Monitor uptime, detect failures instantly, and respond before users notice — all from one unified dashboard.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="group px-5 h-11 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-all flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="px-5 h-11 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                View Live Dashboard
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto mt-20">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
            <div className="relative rounded-2xl border border-white/10 bg-neutral-950/50 backdrop-blur-sm p-1 shadow-2xl">
              <div className="rounded-xl border border-white/5 bg-black p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider">Uptime</span>
                      <CheckCircle2 className="w-4 h-4 text-neutral-600" />
                    </div>
                    <div className="text-3xl font-semibold mb-1">98.7%</div>
                    <div className="text-xs text-neutral-600">Last 30 days</div>
                  </div>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider">Systems</span>
                      <Activity className="w-4 h-4 text-neutral-600" />
                    </div>
                    <div className="text-3xl font-semibold mb-1">24</div>
                    <div className="text-xs text-neutral-600">Monitored</div>
                  </div>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-neutral-500 uppercase tracking-wider">Incidents</span>
                      <AlertCircle className="w-4 h-4 text-neutral-600" />
                    </div>
                    <div className="text-3xl font-semibold mb-1">3</div>
                    <div className="text-xs text-neutral-600">This week</div>
                  </div>
                </div>
                <div className="h-40 rounded-xl border border-white/5 bg-white/[0.01] flex items-end gap-1 p-4">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92, 78, 85].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white/10 hover:bg-white/20 rounded-t transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What AutoPulse Does */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Everything You Need to Stay Online
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            AutoPulse continuously monitors your systems through heartbeat signals, detects downtime in real time, and alerts your team with actionable insights — so you can fix issues before they escalate.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-black hover:bg-white/[0.02] transition-colors group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(i)}
              >
                <feature.icon className="w-6 h-6 text-neutral-400 mb-4 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
            <div className="p-8 bg-black hover:bg-white/[0.02] transition-colors group cursor-pointer flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-neutral-500 mb-2">And more features</div>
                <ChevronRight className="w-5 h-5 text-neutral-600 mx-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">How It Works</h2>
          <div className="space-y-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {steps.map((step, i) => (
              <div key={i} className="p-8 bg-black hover:bg-white/[0.02] transition-colors group">
                <div className="flex gap-6 items-start">
                  <div className="text-sm font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors mt-1">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-800 group-hover:text-neutral-600 transition-colors mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Engineers */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Designed for Reliability-Focused Teams
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            AutoPulse is built with production-grade architecture using modern backend systems, secure APIs, and scalable infrastructure — making it suitable for startups and enterprise-grade systems alike.
          </p>
        </div>
      </section>

      {/* Security & Reliability */}
      <section id="security" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-12">
            <div className="flex items-center gap-2 mb-8">
              <Shield className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold">Security & Reliability</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AutoPulse */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Why AutoPulse?</h2>
          <blockquote className="text-2xl md:text-3xl text-neutral-400 font-light leading-relaxed mb-8">
            "Downtime is inevitable. Being unaware of it is unacceptable."
          </blockquote>
          <p className="text-neutral-500">
            AutoPulse ensures you are always the first to know — and the fastest to respond.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center tracking-tight">Who It's For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {[
              { icon: Users, title: "Backend & Platform Engineers" },
              { icon: Shield, title: "DevOps & SRE Teams" },
              { icon: TrendingUp, title: "Startup Founders" },
              { icon: Activity, title: "Production System Owners" }
            ].map((audience, i) => (
              <div key={i} className="p-8 bg-black hover:bg-white/[0.02] transition-colors text-center group">
                <audience.icon className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 mx-auto mb-4 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm text-neutral-400">{audience.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Stay Always Online?
          </h2>
          <p className="text-lg text-neutral-400 mb-12">
            Join teams who trust AutoPulse to keep their systems monitored 24/7.
          </p>
          <button className="group px-6 h-12 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 mx-auto">
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">AutoPulse</span>
            </div>
            <p className="text-sm text-neutral-500 text-center">
              Know the moment your system goes down.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Github className="w-4 h-4 text-neutral-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Twitter className="w-4 h-4 text-neutral-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Linkedin className="w-4 h-4 text-neutral-400" />
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-neutral-600 space-y-2">
            <p>AutoPulse is a full-stack monitoring platform built to demonstrate real-world system design, alerting strategies, and incident management workflows.</p>
            <p>© 2026 AutoPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}