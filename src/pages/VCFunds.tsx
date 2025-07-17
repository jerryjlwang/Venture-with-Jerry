import { useState } from "react";
import { vcFundsData, Industry, Fund } from "@/data/vcFunds";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TrendingUp, Building, Calendar, DollarSign } from "lucide-react";

const VCFunds = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(vcFundsData[0]?.id || "");

  const selectedIndustryData = vcFundsData.find(industry => industry.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Venture Capital
              <span className="block text-primary">Success Stories</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
              Discover the most successful VC funds across industries. Weekly insights into portfolio performance, 
              returns, and the biggest winners that shaped venture capital history.
            </p>
          </div>
        </div>
      </div>

      {/* Industry Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {vcFundsData.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedIndustry === industry.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {industry.name}
                <Badge variant="secondary" className="ml-2">
                  {industry.funds.length}
                </Badge>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Funds Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {selectedIndustryData && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedIndustryData.name} Funds
              </h2>
              <p className="text-muted-foreground">
                Top performing funds in the {selectedIndustryData.name.toLowerCase()} sector
              </p>
            </div>

            <div className="grid gap-8">
              {selectedIndustryData.funds.map((fund) => (
                <Card key={fund.id} className="border-muted/50 shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-foreground">{fund.name}</CardTitle>
                        <CardDescription className="text-lg">
                          {fund.firm} • {fund.vintage} • {fund.size}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-sm">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {fund.returns}
                        </Badge>
                        <Badge variant="secondary" className="text-sm">
                          {fund.keyMetrics.irr} IRR
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {fund.description}
                      </p>

                      {/* Key Metrics Table */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-muted/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-primary" />
                              Fund Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">IRR</TableCell>
                                  <TableCell className="text-right font-semibold text-primary">
                                    {fund.keyMetrics.irr}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Net Multiple</TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {fund.keyMetrics.multiple}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Investment Period</TableCell>
                                  <TableCell className="text-right">
                                    {fund.keyMetrics.investmentPeriod}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card className="border-muted/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Building className="w-5 h-5 text-primary" />
                              Biggest Winner
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">Company</TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {fund.biggestReturner.company}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Valuation</TableCell>
                                  <TableCell className="text-right font-semibold text-primary">
                                    {fund.biggestReturner.valuation}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Multiple</TableCell>
                                  <TableCell className="text-right font-semibold text-green-600">
                                    {fund.biggestReturner.multiple}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VCFunds;