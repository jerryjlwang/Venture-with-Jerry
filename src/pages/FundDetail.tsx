import { useParams, useNavigate } from "react-router-dom";
import { vcFundsData } from "@/data/vcFunds";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Building, DollarSign, Users, Target, Calendar } from "lucide-react";

const FundDetail = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();

  // Find the fund across all industries
  const fund = vcFundsData
    .flatMap(industry => industry.funds)
    .find(f => f.id === fundId);

  if (!fund) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Fund Not Found</h1>
          <Button onClick={() => navigate("/vc-funds")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to VC Funds
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            onClick={() => navigate("/vc-funds")} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to VC Funds
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {fund.name}
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                {fund.firm} • {fund.vintage} • {fund.size}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                {fund.returns}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {fund.keyMetrics.irr} IRR
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  Fund Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {fund.description}
                </p>
              </CardContent>
            </Card>

            {/* Investment Insights */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Investment Insights & Takeaways
                </CardTitle>
                <CardDescription>
                  Key learnings and strategic insights from this fund's approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Investment Strategy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    [Placeholder] This fund demonstrated exceptional market timing and sector focus. 
                    Their approach to identifying early-stage opportunities in emerging technologies 
                    proved to be highly successful, particularly in their ability to spot trends 
                    before they became mainstream.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Success Factors</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>[Placeholder] Strong network effects in portfolio companies</li>
                    <li>[Placeholder] Exceptional due diligence process and market research</li>
                    <li>[Placeholder] Active involvement in portfolio company growth</li>
                    <li>[Placeholder] Strategic timing of exits and follow-on investments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Lessons Learned</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    [Placeholder] The fund's performance highlights the importance of sector 
                    specialization and deep domain expertise. Their ability to provide value 
                    beyond capital, including strategic guidance and industry connections, 
                    was crucial to their portfolio companies' success.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Analysis */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Portfolio Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top Performer: {fund.biggestReturner.company}</h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Valuation</p>
                        <p className="text-2xl font-bold text-primary">{fund.biggestReturner.valuation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Return Multiple</p>
                        <p className="text-2xl font-bold text-green-600">{fund.biggestReturner.multiple}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Investment Thesis</h4>
                  <p className="text-muted-foreground">
                    [Placeholder] The fund's investment in {fund.biggestReturner.company} exemplifies 
                    their thesis around identifying companies with strong unit economics and 
                    scalable business models in rapidly growing markets.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fund Metrics */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Fund Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">IRR</p>
                    <p className="text-xl font-bold text-primary">{fund.keyMetrics.irr}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Multiple</p>
                    <p className="text-xl font-bold">{fund.keyMetrics.multiple}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Investment Period</p>
                  <p className="font-semibold">{fund.keyMetrics.investmentPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fund Size</p>
                  <p className="font-semibold">{fund.size}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Fund Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vintage Year</span>
                    <span className="font-semibold">{fund.vintage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment Period</span>
                    <span className="font-semibold">{fund.keyMetrics.investmentPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-muted/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Firm</span>
                    <span className="font-medium">{fund.firm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Returns</span>
                    <span className="font-medium text-primary">{fund.returns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top Investment</span>
                    <span className="font-medium">{fund.biggestReturner.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;