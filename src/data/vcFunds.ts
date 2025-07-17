export interface Fund {
  id: string;
  name: string;
  firm: string;
  vintage: string;
  size: string;
  returns: string;
  biggestReturner: {
    company: string;
    valuation: string;
    multiple: string;
  };
  description: string;
  keyMetrics: {
    irr: string;
    multiple: string;
    investmentPeriod: string;
  };
}

export interface Industry {
  id: string;
  name: string;
  funds: Fund[];
}

export const vcFundsData: Industry[] = [
  {
    id: "agtech",
    name: "AgTech",
    funds: [
      {
        id: "voyager-agtech-fund",
        name: "Voyager Capital AgTech Fund",
        firm: "Voyager Capital",
        vintage: "2016",
        size: "$125M",
        returns: "3.2x Net Multiple",
        biggestReturner: {
          company: "Carbon Robotics",
          valuation: "$375M",
          multiple: "45x"
        },
        description: "Early-stage fund focused on agricultural technology companies transforming farming through AI, robotics, and precision agriculture.",
        keyMetrics: {
          irr: "28.5%",
          multiple: "3.2x",
          investmentPeriod: "2016-2020"
        }
      }
    ]
  },
  {
    id: "fintech",
    name: "FinTech",
    funds: [
      {
        id: "sample-fintech-fund",
        name: "FinTech Ventures III",
        firm: "FinTech Ventures",
        vintage: "2018",
        size: "$200M",
        returns: "2.8x Net Multiple",
        biggestReturner: {
          company: "PaymentCorp",
          valuation: "$2.1B",
          multiple: "38x"
        },
        description: "Growth-stage investments in financial technology companies disrupting traditional banking and payments.",
        keyMetrics: {
          irr: "24.3%",
          multiple: "2.8x",
          investmentPeriod: "2018-2022"
        }
      }
    ]
  },
  {
    id: "healthcare",
    name: "HealthTech",
    funds: [
      {
        id: "sample-health-fund",
        name: "MedTech Growth Fund II",
        firm: "Healthcare Ventures",
        vintage: "2017",
        size: "$300M",
        returns: "4.1x Net Multiple",
        biggestReturner: {
          company: "BioInnovate",
          valuation: "$1.8B",
          multiple: "52x"
        },
        description: "Focused on medical devices, digital health, and biotechnology companies improving patient outcomes.",
        keyMetrics: {
          irr: "32.1%",
          multiple: "4.1x",
          investmentPeriod: "2017-2021"
        }
      }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise SaaS",
    funds: [
      {
        id: "sample-saas-fund",
        name: "SaaS Capital Fund IV",
        firm: "Enterprise Capital",
        vintage: "2019",
        size: "$175M",
        returns: "2.5x Net Multiple",
        biggestReturner: {
          company: "WorkflowAI",
          valuation: "$950M",
          multiple: "28x"
        },
        description: "B2B software companies providing mission-critical solutions to enterprise customers.",
        keyMetrics: {
          irr: "22.7%",
          multiple: "2.5x",
          investmentPeriod: "2019-2023"
        }
      }
    ]
  }
];