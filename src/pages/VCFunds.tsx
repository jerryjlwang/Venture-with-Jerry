import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vcFundsData } from "@/data/vcFunds";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TrendingUp, Building, DollarSign } from "lucide-react";

const VCFunds = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(vcFundsData[0]?.id || "");

  const selectedIndustryData = vcFundsData.find(industry => industry.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-800 to-black">
      {/* Hero Section */}
      <div className="bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05)'}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Venture Capital
              <span className="block text-white">Success Stories</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-white/90">
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
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all hover-scale ${
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
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedIndustryData.name} Funds
              </h2>
              <p className="text-white/80">
                Top performing funds in the {selectedIndustryData.name.toLowerCase()} sector
              </p>
            </div>

            <div className="grid gap-8">
              {selectedIndustryData.funds.map((fund) => (
                <Card 
                  key={fund.id} 
                  className="bg-black border-white border-2 shadow-lg hover-scale cursor-pointer transition-all hover:shadow-xl text-white"
                  onClick={() => navigate(`/fund/${fund.id}`)}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-white">{fund.name}</CardTitle>
                        <CardDescription className="text-lg text-gray-300">
                          {fund.firm} • {fund.vintage} • {fund.size}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">
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
                      <p className="text-gray-300 leading-relaxed">
                        {fund.description}
                      </p>

                      {/* Key Metrics Table */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gray-900 border-gray-700 text-white">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2 text-white">
                              <DollarSign className="w-5 h-5 text-green-400" />
                              Fund Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">IRR</TableCell>
                                  <TableCell className="text-right font-semibold text-green-400">
                                    {fund.keyMetrics.irr}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">Net Multiple</TableCell>
                                  <TableCell className="text-right font-semibold text-white">
                                    {fund.keyMetrics.multiple}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">Investment Period</TableCell>
                                  <TableCell className="text-right text-gray-300">
                                    {fund.keyMetrics.investmentPeriod}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-900 border-gray-700 text-white">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2 text-white">
                              <Building className="w-5 h-5 text-blue-400" />
                              Biggest Winner
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">Company</TableCell>
                                  <TableCell className="text-right font-semibold text-white">
                                    {fund.biggestReturner.company}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">Valuation</TableCell>
                                  <TableCell className="text-right font-semibold text-blue-400">
                                    {fund.biggestReturner.valuation}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-300">Multiple</TableCell>
                                  <TableCell className="text-right font-semibold text-green-400">
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
