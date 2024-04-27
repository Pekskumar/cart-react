import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import information from "../../Assets/images/information.svg";

export const LoaderType = {
  ProductCard: "ProductCard",
  ResourceCard: "ResourceCard",
  Table: "Table",
  DashboardCount: "DashboardCount",
  MemberView: "MemberView",
  Line: "Line",
  NODATAFOUND: "NODATAFOUND",
  NODATAFOUND_WHITE: "NODATAFOUND_WHITE",
};

function Loader(prop) {
  let count = prop.count || 4;
  let type = prop.type || "Line";
  let lineheight = prop.lineheight || 30;
  let height = prop.height || "100%";
  let width = prop.width || "100%";
  let divor = prop.divor || "#000000";
  let line = [];
  for (let i = 0; i < count; i++) {
    line.push(i);
  }

  if (type.toUpperCase() === "TABLE") {
    return (
      <div className="skeleton">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {line.map((item, index) => (
              <tr key={index}>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
                <td>
                  <Skeleton height={lineheight} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (type.toUpperCase() === "RESOURCECARD") {
    return (
      <>
        <div className="all-resources-added ">
          {line.map((item, index) => (
            <div className="single-resources-added border-0" key={index}>
              <Skeleton height={20} width={100} className="mb-3" />
              <Skeleton height={28} />
              <Skeleton height={28} width={150} className="mb-3" />
              <Skeleton height={40} width={150} />
            </div>
          ))}
        </div>
      </>
    );
  } else if (type.toUpperCase() === "PRODUCTCARD") {
    return (
      <>
        <div className="trending-content">
          {line.map((item, index) => (
            <div className="inner" key={index}>
              <Skeleton height={346} width="100%" />
              <div className="trending-content-product_card">
                <h3>
                  <a className="product_card-title" href="">
                    <Skeleton height={20} width={200} />
                  </a>
                </h3>
                <div className="price-item">
                  <p>
                    <span>
                      <s>
                        <Skeleton height={20} width={50} />
                      </s>
                    </span>
                  </p>
                  <p>
                    <Skeleton height={20} width={50} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (type.toUpperCase() === "MEMBERVIEW") {
    return (
      <>
        <div className="member-view-left">
          <div className="member-view-profile">
            <Skeleton height={80} width={80} circle={true} />
            <div>
              <h6>
                <Skeleton height={20} width={150} />
              </h6>
              <p>
                <Skeleton height={20} width={50} />
              </p>
            </div>
          </div>
          <div className="member-view-detail">
            <div className="member-view-detail-single m-0">
              <div xl={6} className="member-view-detail-single-inner">
                <Skeleton height={24} width={24} circle={true} />
                <p>
                  <Skeleton height={20} width={100} />
                </p>
              </div>
              <div xl={6} className="member-view-detail-single-inner">
                <Skeleton height={24} width={24} circle={true} />
                <p>
                  <Skeleton height={20} width={100} />
                </p>
              </div>
              <div xl={6} className="member-view-detail-single-inner">
                <Skeleton height={24} width={24} circle={true} />
                <p>
                  <Skeleton height={20} width={100} />
                </p>
              </div>
              <div xl={6} className="member-view-detail-single-inner">
                <Skeleton height={24} width={24} circle={true} />
                <p>
                  <Skeleton height={20} width={100} className="mb-1" />
                  <Skeleton height={20} width={100} />
                </p>
              </div>
              <div
                xl={12}
                className="member-view-detail-single-inner information"
              >
                <Skeleton height={24} width={24} circle={true} />
                <p>
                  <Skeleton height={20} width={100} />
                </p>
              </div>
            </div>
          </div>
          <div className="member-view-business-info">
            <h4 className="title-22 marginbottom20">Business Information</h4>
            <div className="member-view-business-info-wrapper-main">
              <div className="member-view-business-info-wrapper ">
                <div xl={6} className="member-view-business-info-single p-0">
                  <span>DL Name</span>
                  <p>
                    <Skeleton height={20} width={100} />
                  </p>
                </div>
                <div xl={6} className="member-view-business-info-single p-0">
                  <span>Business Name</span>
                  <p>
                    <Skeleton height={20} width={100} />
                  </p>
                </div>
              </div>
              <div className="member-view-business-info-wrapper ">
                <div xl={6} className="member-view-business-info-single p-0">
                  <span>Business Phone</span>
                  <p>
                    <Skeleton height={20} width={100} />
                  </p>
                </div>
                <div xl={6} className="member-view-business-info-single p-0">
                  <span>Contact Number</span>
                  <p>
                    <Skeleton height={20} width={100} />
                  </p>
                </div>
              </div>
              <div className="member-view-business-info-wrapper ">
                <div xl={6} className="member-view-business-info-single p-0">
                  <span>Address</span>
                  <p>
                    <Skeleton height={20} width={100} className="mb-1" />
                    <Skeleton height={20} width={100} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (type.toUpperCase() === "DASHBOARDCOUNT") {
    return (
      <>
        <div className="all-dashboard-cards marginbottom30">
          {line.map((item, index) => (
            <div className="DashboardCard-main" key={index}>
              <div className="DashboardCard-image">
                <Skeleton
                  height={70}
                  width={70}
                  className="mb-2"
                  circle={true}
                />
              </div>
              <div className="DashboardCard-content">
                <Skeleton height={30} width={160} className="mb-2" />
                <Skeleton height={20} width={160} className="mb-2" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (type.toUpperCase() === "NODATAFOUND") {
    return (
      <div
        style={{
          height: height,
          width: width,
          // fontSize: fontsize,
          divor: divor,
          textAlign: "center",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <NoDataFound /> */}
        <div className="text-center d-flex align-items-center justify-content-center gap-1">
          {/* <img src={information} alt="information" /> */}
          <p>No data found</p>
        </div>
      </div>
    );
  } else if (type.toUpperCase() === "NODATAFOUND_WHITE") {
    return (
      <div
        style={{
          height: height,
          width: width,
          // fontSize: fontsize,
          divor: divor,
          textAlign: "center",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <NoDataFoundWhite /> */}
        <div className="text-center d-flex align-items-center justify-content-center gap-1">
          {/* <img src={information} alt="information" /> */}
          <p>No data found</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="skeleton">
        <Skeleton count={count} height={lineheight} />
      </div>
    );
  }
}
export default Loader;
