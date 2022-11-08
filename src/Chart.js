import React, { useState } from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'
import { BrowserRouter, Route, useParams, withRouter } from 'react-router-dom'
import { tree, tree1, tree2, tree3, tree4 } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'

class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  componentDidMount() {
    const klola_id = this.props.match.params.klola_id;
    const tahun = this.props.match.params.tahun;
    const subdomain = this.props.match.params.subdomain;
    this.fetchData(klola_id, tahun, subdomain);
}

// Get Data
fetchData = (id, year, domain) => {
   console.log(id, year, domain);
};

  getChild = id => {
    switch (id) {
      case 100:
        return tree1
      case 36:
        return tree2
      case 56:
        return tree3
      case 25:
        return tree4
      default:
        return console.log('no children')
    }
  }

  getParent = d => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: 'Director',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      }
    } else {
      return d
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  render() {
    const { tree, downloadingChart } = this.state
    // const { klola_id } = useParams();
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
          <React.Fragment>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >
                +
              </button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >
                -
              </button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">
                Download as image
              </button>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            <OrgChart
              tree={tree}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
              loadParent={d => {
                const parentData = this.getParent(d)
                return parentData
              }}
              loadChildren={d => {
                const childrenData = this.getChild(d.id)
                return childrenData
              }}
            />
          </React.Fragment>
    )
  }
}

export default withRouter(Chart);

// export default function Chart() {
//     const [tree, setTree] = useState(tree);
//     const [downloadingChart, setDownloadingChart] = useState(false);
//     const [config, setConfig] = useState(false);
//     const [highlightPostNumbers, setHighlightPostNumbers] = useState([1]);

//     getChild = id => {
//         switch (id) {
//           case 100:
//             return tree1
//           case 36:
//             return tree2
//           case 56:
//             return tree3
//           case 25:
//             return tree4
//           default:
//             return console.log('no children')
//         }
//       }
    
//       getParent = d => {
//         if (d.id === 100) {
//           return {
//             id: 500,
//             person: {
//               id: 500,
//               avatar: avatarPersonnel,
//               department: '',
//               name: 'Pascal ruth',
//               title: 'Member',
//               totalReports: 1,
//             },
//             hasChild: false,
//             hasParent: true,
//             children: [d],
//           }
//         } else if (d.id === 500) {
//           return {
//             id: 1,
//             person: {
//               id: 1,
//               avatar: avatarPersonnel,
//               department: '',
//               name: 'Bryce joe',
//               title: 'Director',
//               totalReports: 1,
//             },
//             hasChild: false,
//             hasParent: false,
//             children: [d],
//           }
//         } else {
//           return d
//         }
//       }
    
//       handleDownload = () => {
//         setDownloadingChart(false)
//       }
    
//       handleOnChangeConfig = config => {
//         setConfig(config)
//       }
    
//       handleLoadConfig = () => {
//         return config
//       }
//     return (
//         <React.Fragment>
//         <div className="zoom-buttons">
//           <button
//             className="btn btn-outline-primary zoom-button"
//             id="zoom-in"
//           >
//             +
//           </button>
//           <button
//             className="btn btn-outline-primary zoom-button"
//             id="zoom-out"
//           >
//             -
//           </button>
//         </div>
//         <div className="download-buttons">
//           <button className="btn btn-outline-primary" id="download-image">
//             Download as image
//           </button>
//           {/* <button className="btn btn-outline-primary" id="download-pdf">
//             Download as PDF
//           </button> */}
//           {downloadingChart && <div>Downloading chart</div>}
//         </div>
//         <OrgChart
//           tree={tree}
//           downloadImageId={downloadImageId}
//           downloadPdfId={downloadPdfId}
//           onConfigChange={config => {
//             this.handleOnChangeConfig(config)
//           }}
//           loadConfig={d => {
//             let configuration = this.handleLoadConfig(d)
//             if (configuration) {
//               return configuration
//             }
//           }}
//           downlowdedOrgChart={d => {
//             this.handleDownload()
//           }}
//           loadImage={d => {
//             return Promise.resolve(avatarPersonnel)
//           }}
//           loadParent={d => {
//             const parentData = this.getParent(d)
//             return parentData
//           }}
//           loadChildren={d => {
//             const childrenData = this.getChild(d.id)
//             return childrenData
//           }}
//         />
//       </React.Fragment>
//     );
//   }