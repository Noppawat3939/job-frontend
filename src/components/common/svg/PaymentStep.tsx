import { Spinner } from "..";

type PaymentStepProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  step?: number;
  qrcode: string;
  loading?: boolean;
};

function PaymentStep({
  width = 300,
  height = 300,
  color,
  step = 1,
  qrcode,
  loading = false,
}: PaymentStepProps) {
  const step1 = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 545.56323 523.50056"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M491.30435,507.16761c2.06592,.12937,3.20768-2.43737,1.64468-3.93333l-.1555-.61819c.02047-.04951,.04105-.09897,.06178-.14839,2.08924-4.9818,9.16992-4.94742,11.24139,.04177,1.83859,4.42817,4.17942,8.86389,4.75579,13.54594,.25838,2.0668,.14213,4.17236-.31648,6.20047,4.30807-9.41059,6.57515-19.68661,6.57515-30.02077,0-2.59652-.14213-5.19301-.43275-7.78295-.239-2.11854-.56839-4.2241-.99471-6.31034-2.30575-11.2772-7.29852-22.01825-14.50012-30.98962-3.46197-1.89248-6.34906-4.85065-8.09295-8.39652-.62649-1.27891-1.11739-2.65462-1.34991-4.05618,.39398,.05168,1.48556-5.94866,1.18841-6.3168,.54906-.83317,1.53178-1.24733,2.13144-2.06034,2.98232-4.04341,7.0912-3.33741,9.23621,2.15727,4.58224,2.31266,4.62659,6.14806,1.81495,9.83683-1.78878,2.34682-2.03456,5.52233-3.60408,8.03478,.16151,.20671,.32944,.40695,.4909,.61366,2.96106,3.79788,5.52208,7.88002,7.68104,12.16859-.61017-4.76621,.29067-10.50822,1.82641-14.20959,1.74819-4.21732,5.02491-7.76915,7.91045-11.41501,3.46601-4.37924,10.57337-2.46806,11.18401,3.08332,.00591,.05375,.01166,.10745,.01731,.1612-.4286,.24178-.84849,.49867-1.25864,.76992-2.33949,1.54723-1.53096,5.17386,1.24107,5.60174l.06277,.00967c-.15503,1.54366-.41984,3.07444-.80734,4.57937,3.70179,14.31579-4.29011,19.5299-15.70147,19.76412-.25191,.12916-.49738,.25832-.74929,.38109,1.15617,3.25525,2.07982,6.59447,2.76441,9.97891,.61359,2.99043,1.03991,6.01317,1.27885,9.04888,.29715,3.83006,.27129,7.67959-.05168,11.50323l.01939-.13562c.82024-4.21115,3.10671-8.14462,6.4266-10.87028,4.94561-4.06264,11.93282-5.55869,17.26826-8.82425,2.56833-1.57196,5.85945,.45945,5.41121,3.43708l-.02182,.14261c-.79443,.32289-1.56947,.69755-2.31871,1.11733-.4286,.24184-.84848,.49867-1.25864,.76992-2.33949,1.54729-1.53096,5.17392,1.24107,5.6018l.06282,.00965c.0452,.00646,.08397,.01295,.12911,.01944-1.36282,3.23581-3.26168,6.23922-5.63854,8.82922-2.31463,12.49713-12.25603,13.68282-22.89022,10.04354h-.00648c-1.16259,5.06378-2.86128,10.01127-5.0444,14.72621h-18.02019c-.06463-.20022-.12274-.40692-.18089-.60717,1.6664,.10341,3.34571,.00649,4.98629-.29702-1.33701-1.64059-2.67396-3.29409-4.01097-4.93462-.03229-.0323-.05816-.0646-.08397-.09689-.67817-.8396-1.36282-1.67283-2.04099-2.51246l-.00036-.00102c-.04245-2.57755,.26652-5.14662,.87876-7.63984l.00057-.00035Z"
          fill="#f2f2f2"
        />
        <path
          d="M159.753,522.31056c0,.66003,.53003,1.19,1.19006,1.19h383.28998c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H160.94307c-.66003,0-1.19006,.53003-1.19006,1.19Z"
          fill="#ccc"
        />
        <g>
          <path
            d="M217.91365,522.99361H41.48886c-21.51191,0-39.01333-17.50142-39.01333-39.01374V104.83075c0-21.51191,17.50142-39.01333,39.01333-39.01333H217.91365c21.51151,0,39.01293,17.50142,39.01293,39.01333V483.97987c0,21.51232-17.50142,39.01374-39.01293,39.01374Z"
            fill="#3f3d56"
          />
          <path
            d="M256.92674,205.28092c-.91025,0-1.65045,.74021-1.65045,1.65045v52.81453c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-52.81453c0-.91025-.74021-1.65045-1.65045-1.65045Z"
            fill="#3f3d56"
          />
          <path
            d="M253.21342,104.83104V483.97336c0,18.7244-14.57349,34.04062-33.00082,35.22894h-.00826c-.27234,.01652-.54463,.03304-.82523,.0413-.48691,.02473-.97376,.03299-1.46888,.03299,0,0-1.81551-.13206-5.13294-.37962-3.35042-.24756-8.22749-.61892-14.30946-1.10578-1.82372-.14032-3.74651-.29712-5.77659-.46213-4.04358-.33011-8.48331-.69321-13.24488-1.10583-1.89801-.1568-3.86206-.33006-5.86735-.50338-10.24931-.883-21.72824-1.91453-33.83431-3.08634-2.04655-.18984-4.10961-.38788-6.1892-.59419-.54463-.05777-1.09757-.10728-1.65045-.16506-8.63189-.84996-125.71564-23.47767-125.71564-27.90092V104.83104c0-19.50007,15.80312-35.30319,35.30324-35.30319h21.07628c3.36694,0,6.07366,2.62422,6.36252,5.9829,.02473,.22283,.04951,.4456,.09076,.66843,.61066,3.3752,3.70526,5.72708,7.13818,5.72708h107.08205c3.43292,0,6.52752-2.35188,7.13818-5.72708,.04125-.22283,.06603-.4456,.09081-.66843,.28881-3.35868,2.99553-5.9829,6.36247-5.9829h21.07633c19.50007,0,35.30319,15.80312,35.30319,35.30319Z"
            fill="#fff"
          />
          <path
            d="M1.65045,165.67002c-.91025,0-1.65045,.74021-1.65045,1.65045v13.20363c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-13.20363c0-.91025-.74021-1.65045-1.65045-1.65045Z"
            fill="#3f3d56"
          />
          <path
            d="M1.65045,205.28092c-.91025,0-1.65045,.74021-1.65045,1.65045v25.58204c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-25.58204c0-.91025-.74021-1.65045-1.65045-1.65045Z"
            fill="#3f3d56"
          />
          <path
            d="M1.65045,241.59091c-.91025,0-1.65045,.74021-1.65045,1.65045v25.58204c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-25.58204c0-.91025-.74021-1.65045-1.65045-1.65045Z"
            fill="#3f3d56"
          />
          <rect
            x="30.12079"
            y="75.30766"
            width="32.18385"
            height="4.12614"
            rx=".31021"
            ry=".31021"
            fill="#e6e6e6"
          />
          <circle cx="202.04914" cy="76.13289" r="3.30091" fill="#e6e6e6" />
          <circle cx="211.12664" cy="76.13289" r="3.30091" fill="#e6e6e6" />
          <circle cx="220.20414" cy="76.13289" r="3.30091" fill="#e6e6e6" />
        </g>
        <path
          d="M199.2886,298.51575H59.2886c-2.20557,0-4-1.79443-4-4s1.79443-4,4-4H199.2886c2.20557,0,4,1.79443,4,4s-1.79443,4-4,4Z"
          fill="#e6e6e6"
        />
        <circle cx="129.79071" cy="395.51575" r="58" fill={color} />
        <path
          d="M139.00859,376.57804c-4.89484,.20103-10.42855,.53711-14.04647,4.293-3.14318,3.26305-3.83195,8.10532-.64457,11.58907,3.19575,3.49289,8.16452,3.96549,11.84835,6.69033,4.32554,3.1995,3.69197,9.52925-.49392,12.56163-4.93603,3.57581-11.30911,1.90862-15.82167-1.49356-1.15636-.87182-2.27886,1.08088-1.13562,1.94281,4.04299,3.04815,9.31864,4.74505,14.31748,3.2865,4.51149-1.31636,8.00859-4.995,8.3643-9.77982,.16977-2.28366-.47955-4.60146-1.89955-6.40441-1.499-1.90326-3.65809-3.0743-5.84068-4.02726-3.75733-1.64052-10.22682-3.76303-9.1344-9.10397,1.32412-6.47372,9.20386-7.08735,14.48676-7.30431,1.44277-.05925,1.45029-2.30956,0-2.25h0Z"
          fill="#fff"
        />
        <path
          d="M129.928,373.51575l-.21574,49.39335c-.00632,1.44801,2.24367,1.44986,2.25,0l.21574-49.39335c.00632-1.44801-2.24367-1.44986-2.25,0h0Z"
          fill="#fff"
        />
        <path
          d="M437.08565,0H151.12569c-10.48999,0-19.02002,8.52997-19.02002,19.01996V214.97998c0,10.48999,8.53003,19.02002,19.02002,19.02002H437.08565c10.48999,0,19.02002-8.53003,19.02002-19.02002V19.01996c0-10.48999-8.53003-19.01996-19.02002-19.01996Z"
          fill="#fff"
        />
        <circle cx="292.79071" cy="84.51575" r="32" fill={color} />
        <path
          d="M298.86106,70.23584c-3.96096,.16324-8.42022,.41435-11.41661,3.36215-2.48204,2.4418-3.34997,6.24304-1.06925,9.11803,2.40131,3.02702,6.39485,3.6014,9.52957,5.53579,1.94826,1.20224,3.23934,3.0236,3.28121,5.36426,.03919,2.19141-.97209,4.23876-2.6628,5.61221-4.1481,3.36971-9.80485,1.97481-13.72914-.97221-.77211-.57983-1.52056,.72186-.75708,1.29521,3.25012,2.44074,7.43474,3.8583,11.47885,2.80815,3.72256-.96665,6.72131-3.89507,7.12458-7.80812,.42504-4.12426-2.28291-6.93249-5.79432-8.54355-3.2096-1.47258-8.83914-3.04159-8.30843-7.61645,.67475-5.81661,7.79544-6.46889,12.32342-6.6555,.96183-.03964,.96686-1.53985,0-1.5h0Z"
          fill="#fff"
        />
        <path
          d="M291.97743,67.51575l-.17986,41.15818c-.00422,.96534,1.49578,.96658,1.5,0l.17986-41.15818c.00422-.96534-1.49578-.96658-1.5,0h0Z"
          fill="#fff"
        />
        <path
          d="M437.08565,0H151.12569c-10.48999,0-19.02002,8.52997-19.02002,19.01996V214.97998c0,10.48999,8.53003,19.02002,19.02002,19.02002H437.08565c10.48999,0,19.02002-8.53003,19.02002-19.02002V19.01996c0-10.48999-8.53003-19.01996-19.02002-19.01996Zm17.02002,214.97998c0,9.39001-7.63,17.02002-17.02002,17.02002H151.12569c-9.39001,0-17.02002-7.63-17.02002-17.02002V19.01996c0-9.38995,7.63-17.01996,17.02002-17.01996H437.08565c9.39001,0,17.02002,7.63,17.02002,17.01996V214.97998Z"
          fill="#3f3d56"
        />
        <g>
          <path
            d="M261.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z"
            fill="#e6e6e6"
          />
          <path
            d="M308.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z"
            fill="#e6e6e6"
          />
          <path
            d="M355.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z"
            fill="#e6e6e6"
          />
        </g>
        <path
          d="M401.41567,134.51575H186.79567c-8.92999,0-16.19,7.26001-16.19,16.19v14.62c0,8.92999,7.26001,16.19,16.19,16.19h214.62c8.92999,0,16.19-7.26001,16.19-16.19v-14.62c0-8.92999-7.26001-16.19-16.19-16.19Z"
          fill={color}
        />
        <path
          d="M73.17926,211.49182l-8.22992-3.89856c3.37555,4.71082,6.28418,12.06805,7.84137,17.92249,2.63654-5.45343,6.88672-12.1261,11.09375-16.11194l-8.69812,2.23767c5.35974-26.26794,25.5191-45.12573,48.60437-45.12573v-2c-24.11316,0-45.13898,19.64758-50.61145,46.97607Z"
          fill="#3f3d56"
        />
        <path
          d="M111.05843,251.51575H59.05843c-2.20557,0-4-1.79443-4-4s1.79443-4,4-4h52c2.20557,0,4,1.79443,4,4s-1.79443,4-4,4Z"
          fill="#e6e6e6"
        />
        <g>
          <polygon
            points="456.97872 238.488 456.45423 279.32691 446.29273 315.73235 438.16969 312.70231 441.77632 279.33303 441.30222 234.1757 456.97872 238.488"
            fill="#ffb6b6"
          />
          <ellipse
            cx="440.63007"
            cy="320.57804"
            rx="9.63433"
            ry="5.72038"
            transform="translate(46.30757 696.65636) rotate(-79.68097)"
            fill="#ffb6b6"
          />
          <path
            d="M444.64807,189.86134s17.40715,.23962,17.39246,9.48652c-.0083,5.22083-1.1295,52.62318-4.24981,81.41974-2.40625,22.20666-7,28-7,28l-11-25,4.85735-93.90626Z"
            fill="#e6e6e6"
          />
          <path
            d="M444.20053,273.29856h-58.7876c4.92749-10.99533,7.95685-21.46701,3.22119-29.79648l55.56641-3.22122c-2.77679,11.24445-3.11621,22.27954,0,33.0177Z"
            fill="#ffb6b6"
          />
          <path
            d="M436.95273,175.85608l-23.35398-1.61062-9.66372,12.07965-4.89907,.89074c-7.34381,1.33524-12.5732,7.8888-12.24512,15.3458l1.9056,43.31268,55.82064,4.07026,13.3737-56.40211-16.10619-6.41205-4.83186-11.27434Z"
            fill="#e6e6e6"
          />
          <g>
            <path
              d="M294.53066,188.92176c1.65693,1.49058,2.83981,3.2318,3.46456,4.92062l16.68132,13.2027-6.51458,7.75386-16.22013-14.22767c-1.74528-.44324-3.60149-1.436-5.25841-2.92658-3.78524-3.40522-5.0971-8.11837-2.93014-10.52715,2.16696-2.40878,6.99213-1.60101,10.77736,1.8042h0Z"
              fill="#ffb6b6"
            />
            <path
              d="M412.46752,200.03661v.00003l-63.91645,43.15944-45.81651-31.88401,6.87858-12.45997,36.05991,20.95662,33.25501-25.53436c11.84186-11.12319,26.6836-8.96705,33.53945,5.76225Z"
              fill="#e6e6e6"
            />
          </g>
          <circle cx="423.89065" cy="153.30238" r="17.32595" fill="#ffb6b6" />
          <path
            d="M447.44074,149.04572v3.36005l-19.54004-5.5-14.64996,3.06995c-.17004-2.22998-.83002-4.41998-1.92999-6.35999,.76544,3.11154,.85107,5.51877,.03998,6.76001l-1.97003,.40997c-.31995-.87-.94-1.62994-1.75-2.08997-.07996-.04999-.17999-.09003-.26996-.06-.14001,.04999-.15002,.22998-.15002,.37,.02002,.73999,.03998,1.47998,.07001,2.21997l-5.65997,1.18005v-3.36005c-5.43011-12.21786,8.88177-22.79028,22.90997-22.89996,6.32983-.0495,12.04999,2.56,16.20001,6.69995,4.14001,4.15002,6.70001,9.87006,6.70001,16.20001Z"
            fill="#2f2e41"
          />
          <path
            d="M458.43313,188.44404l-1.4756-.12217c.10507-.48251,.21013-.95895,.30608-1.44147,.81774-4.04957-.9822-9.20467-1.1147-13.09543-.69441,4.11063,.4934,9.16803-.73551,13.07098-.13705,.43368-5.4765,3.23228-5.62268,3.6598-5.90945-2.16102-12.06314-9.06597-19.03157-5.03298-4.12132,2.38522-8.82359,1.33977-13.50285,.24763-1.15832-.27035-1.31925-5.9899-2.46558-6.21465-2.05278-.40246-5.06763,4.79685-7,5l8-31c0-16.86402-1.56207-34.55742,19.80018-28.59431,5.37269,1.49975,10.69018,2.67528,14.65559,7.10965,3.96541,4.44045,6.78871,10.64614,7.7892,17.71303,.60304,4.26333,4.36744,18.73916,.39745,38.69992Z"
            fill="#2f2e41"
          />
          <g>
            <polygon
              points="444.63823 500.18039 435.10166 500.40544 429.78582 457.56122 443.85939 457.22818 444.63823 500.18039"
              fill="#ffb7b7"
            />
            <path
              d="M411.91948,520.07655h0c0,1.61103,1.14328,2.91706,2.55362,2.91706h18.92928s1.86279-7.48795,9.4577-10.71043l.52418,10.71043h9.76495l-1.18313-17.22188s2.61217-9.21376-2.81276-13.92358c-5.42499-4.70982-1.03095-4.05417-1.03095-4.05417l-2.13409-10.65904-14.7559,1.7352-.1085,16.7322-7.16093,16.60827-10.50335,5.18849c-.93485,.46179-1.54002,1.51399-1.54002,2.67743l-.00012,.00003Z"
              fill="#2f2e41"
            />
          </g>
          <g>
            <polygon
              points="415.62444 493.19838 406.45713 495.83604 390.44322 455.74315 403.97162 451.84972 415.62444 493.19838"
              fill="#ffb7b7"
            />
            <path
              d="M389.02547,520.74594h0c.40881,1.5583,1.84609,2.53146,3.21026,2.17358l18.30968-4.80346s-.09831-7.71555,6.43027-12.75982l3.22488,10.22684,9.44532-2.47794-5.5146-16.35794s.1886-9.57504-6.25391-12.75407c-6.44257-3.17902-2.02599-3.65986-2.02599-3.65986l-4.76906-9.7686-13.83258,5.42284,4.14099,16.21205-2.71205,17.88179-8.84293,7.68397c-.78707,.6839-1.10542,1.85522-.81019,2.98058l-.00011,.00006Z"
              fill="#2f2e41"
            />
          </g>
          <path
            d="M438.79071,270.7676l6,2c9.38098,17.32587,13.35828,40.3338,12.83124,68.07819l-10.65781,124.61142h-17.43665l-12.76045-138.82181-22.4998,52.1048,16.46225,86.71701-16.46225,1.67839-33.1576-90.1717,23.0919-104.8017,54.58918-1.3946Z"
            fill="#2f2e41"
          />
        </g>
      </svg>
    );
  };

  const step2 = () => {
    return (
      <div className="block relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          data-name="Layer 1"
          width={width}
          height={height}
          viewBox="0 0 819 695.68096"
        >
          <defs>
            <linearGradient
              id="e8f3bced-dea3-4e6a-a8e5-01bc48f24d29-8766"
              x1="399.62463"
              y1="402.98543"
              x2="431.5004"
              y2="371.10966"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#1a237e" stop-opacity="0.4" />
              <stop offset="1" stop-color="#1a237e" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M258.252,774.44968c41.30136,26.49223,92.8981,25.1479,142.50683,18.94009,6.92725-.86617,13.8007-1.81479,20.60773-2.80536.04074-.013.09521-.01206.13662-.025.32706-.049.65478-.09815.96832-.13378,1.40476-.20835,2.81019-.41661,4.20167-.62509l-.29636.6483-.93136,2.01231c.33732-.67487.67508-1.33611,1.0124-2.011.099-.20245.2113-.40476.30964-.60731,11.6882-23.14612,23.22638-47.11123,25.1057-72.92222,1.93658-26.78988-9.17165-56.40653-33.29572-68.21958a47.32456,47.32456,0,0,0-9.91616-3.53749c-1.42351-.34993-2.86164-.61847-4.31373-.84645-15.19051-2.24959-31.45916,2.328-42.76285,12.81124-14.95171,13.89355-20.1798,37.26818-12.58422,56.21286-20.95358-19.28628-19.03365-52.51305-13.67565-80.4851,5.37129-27.97191,12.01953-59.13428-3.276-83.17222-8.50349-13.38029-22.60916-21.205-38.10651-23.82707-.47518-.0759-.94969-.15171-1.42508-.21391-17.98708-2.66293-37.66633,1.5865-52.605,12.1735-28.27978,20.02985-41.4273,55.82119-44.457,90.34978C190.57023,683.72963,211.29452,744.32649,258.252,774.44968Z"
            transform="translate(-190.5 -102.15952)"
            fill="#f2f2f2"
          />
          <path
            d="M266.31366,685.36706a125.84235,125.84235,0,0,0,10.585,34.94243,109.27064,109.27064,0,0,0,18.43563,26.75668c15.21655,16.41613,34.80754,28.31809,55.791,35.82026a201.49692,201.49692,0,0,0,49.63355,10.50334c6.92725-.86617,13.8007-1.81479,20.60773-2.80536.04074-.013.09521-.01206.13662-.025.32706-.049.65478-.09815.96832-.13378,1.40476-.20835,2.81019-.41661,4.20167-.62509l-.29636.6483-.93136,2.01231c.33732-.67487.67508-1.33611,1.0124-2.011.099-.20245.2113-.40476.30964-.60731a111.38359,111.38359,0,0,1-36.4251-95.6096,112.33772,112.33772,0,0,1,18.31892-49.06969c-1.42351-.34993-2.86164-.61847-4.31373-.84645a116.47285,116.47285,0,0,0-9.65994,18.14446,114.1251,114.1251,0,0,0-6.00318,71.42583A116.68039,116.68039,0,0,0,421.3422,790.4071c-1.33321-.02188-2.68015-.0576-3.999-.10648-24.97181-.76354-50.06786-4.76778-73.20552-14.49627C324.595,767.60463,306.649,754.98122,293.25751,738.459,278.58545,720.3644,271.345,698.03713,269.068,675.07c-2.42716-24.58885-.58356-49.84253,3.747-74.11636a309.78761,309.78761,0,0,1,22.169-72.20844,2.22731,2.22731,0,0,0-1.04165-2.88839,1.89447,1.89447,0,0,0-1.42508-.21391,1.64923,1.64923,0,0,0-1.03686.99c-1.27136,2.85044-2.51616,5.70131-3.70626,8.58032a313.30392,313.30392,0,0,0-20.52351,74.78016C263.63284,634.76884,262.37994,660.54933,266.31366,685.36706Z"
            transform="translate(-190.5 -102.15952)"
            fill="#fff"
          />
          <path
            id="fe7ea4cb-bc3a-4b8d-a4ea-d66dad23bcdf-8767"
            data-name="Path 22"
            d="M757.927,267.44249h-3.82147V162.75322a60.59371,60.59371,0,0,0-60.59369-60.5937H471.706a60.5937,60.5937,0,0,0-60.5937,60.5937V737.09666a60.59371,60.59371,0,0,0,60.5937,60.59369H693.51185a60.5937,60.5937,0,0,0,60.59275-60.59369V341.96237h3.82147Z"
            transform="translate(-190.5 -102.15952)"
            fill="#3f3d56"
          />
          <path
            id="eacd08e9-88f4-437e-9f6d-ef6f76b30d28-8768"
            data-name="Path 23"
            d="M695.95679,117.918H667.00615a21.49818,21.49818,0,0,1-19.90685,29.61745h-127.07a21.49822,21.49822,0,0,1-19.905-29.61745H473.08259A45.25079,45.25079,0,0,0,427.8318,163.1688V736.67827A45.25081,45.25081,0,0,0,473.08259,781.929h222.8742a45.2508,45.2508,0,0,0,45.25078-45.25077h0V163.16787a45.25079,45.25079,0,0,0-45.2508-45.24986Z"
            transform="translate(-190.5 -102.15952)"
            fill="#fff"
          />
          <path
            d="M986.33865,785.67187c-16.07347,11.57933-36.9035,12.16076-57.038,10.73823-2.81151-.19837-5.60314-.43114-8.36889-.68228-.01671-.00433-.03865-.00278-.05563-.0071-.13291-.01265-.2661-.02531-.39328-.03285-.57085-.05341-1.142-.10677-1.70747-.16052l.13358.2549.41929.791c-.15068-.26472-.30125-.52394-.45193-.78866-.04432-.07946-.094-.15858-.13805-.23809-5.21593-9.07667-10.38922-18.48678-11.70882-28.85133-1.364-10.75793,2.46937-22.93947,11.93757-28.227a19.10558,19.10558,0,0,1,3.92059-1.642c.56626-.17207,1.14018-.31164,1.72061-.43516a20.47893,20.47893,0,0,1,23.81549,26.62141c8.02734-8.2313,6.52991-21.58457,3.76087-32.7446-2.77441-11.15967-6.13306-23.57776-.49019-33.60145,3.13679-5.57928,8.653-9.04086,14.84353-10.43534.18991-.04094.37955-.08183.56985-.11726a29.88715,29.88715,0,0,1,21.47227,3.7623c11.83684,7.45914,17.9164,21.60184,19.88955,35.45577C1011.64876,747.62531,1004.61328,772.50561,986.33865,785.67187Z"
            transform="translate(-190.5 -102.15952)"
            fill="#f2f2f2"
          />
          <path
            d="M981.14912,749.93454a50.80583,50.80583,0,0,1-3.50645,14.31718,44.11557,44.11557,0,0,1-6.8496,11.1881,56.52336,56.52336,0,0,1-21.71175,15.65532,81.35029,81.35029,0,0,1-19.78064,5.315c-2.81151-.19837-5.60314-.43114-8.36889-.68228-.01671-.00433-.03865-.00278-.05563-.0071-.13291-.01265-.2661-.02531-.39328-.03285-.57085-.05341-1.142-.10677-1.70747-.16052l.13358.2549.41929.791c-.15068-.26472-.30125-.52394-.45193-.78866-.04432-.07946-.094-.15858-.13805-.23809a44.96876,44.96876,0,0,0,12.60281-39.33721,45.354,45.354,0,0,0-8.45347-19.38315c.56626-.17207,1.14018-.31164,1.72061-.43516a47.02347,47.02347,0,0,1,4.28937,7.10445,46.07559,46.07559,0,0,1,3.97523,28.664,47.1072,47.1072,0,0,1-11.93512,23.49643c.537-.03784,1.07923-.08157,1.60983-.13,10.05054-.85151,20.0806-3.01218,29.19653-7.43789a52.58382,52.58382,0,0,0,19.6988-16.16323c5.52095-7.61411,7.95373-16.77279,8.37165-26.08135a110.06841,110.06841,0,0,0-3.12425-29.79776,125.0698,125.0698,0,0,0-10.50939-28.62751.89924.89924,0,0,1,.35705-1.18711.76485.76485,0,0,1,.56985-.11726.66581.66581,0,0,1,.43955.37652c.5746,1.12145,1.1385,2.24365,1.681,3.37839a126.48949,126.48949,0,0,1,9.902,29.7001C981.12823,729.478,982.19463,739.84385,981.14912,749.93454Z"
            transform="translate(-190.5 -102.15952)"
            fill="#fff"
          />
          <path
            d="M1008.5,797.76745h-817a1,1,0,0,1,0-2h817a1,1,0,0,1,0,2Z"
            transform="translate(-190.5 -102.15952)"
            fill="#3f3d56"
          />
          <polygon
            points="639.613 684.297 627.354 684.296 621.521 637.008 639.616 637.009 639.613 684.297"
            fill="#ffb8b8"
          />
          <path
            d="M618.5965,680.79321h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H603.70964a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,618.5965,680.79321Z"
            fill="#2f2e41"
          />
          <polygon
            points="685.613 684.297 673.354 684.296 667.521 637.008 685.616 637.009 685.613 684.297"
            fill="#ffb8b8"
          />
          <path
            d="M664.5965,680.79321h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H649.70964a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,664.5965,680.79321Z"
            fill="#2f2e41"
          />
          <path
            d="M874.616,645.61772a10.74267,10.74267,0,0,1-2.06221-16.343l-8.0725-114.55784,23.253,2.25509.63868,112.18665a10.80091,10.80091,0,0,1-13.757,16.45913Z"
            transform="translate(-190.5 -102.15952)"
            fill="#ffb8b8"
          />
          <path
            d="M829.53426,762.63347l-13.49634-.64356A4.499,4.499,0,0,1,811.752,757.527l-.94189-136.55664a4.5011,4.5011,0,0,1,5.14648-4.48535l53.99365,7.83789a4.47382,4.47382,0,0,1,3.85352,4.41992L880.74813,755.277a4.50048,4.50048,0,0,1-4.5,4.53418h-14.55a4.47889,4.47889,0,0,1-4.44532-3.80078l-8.977-57.06738a3.5,3.5,0,0,0-6.93286.12793l-7.12622,59.60254a4.51711,4.51711,0,0,1-4.46875,3.96582Q829.64168,762.63933,829.53426,762.63347Z"
            transform="translate(-190.5 -102.15952)"
            fill="#2f2e41"
          />
          <path
            d="M839.03523,628.7487c-11.89941-6.61133-21.197-8.34863-25.67993-8.7959a4.418,4.418,0,0,1-3.05346-1.67285,4.478,4.478,0,0,1-.93116-3.40137l12.9375-96.05078a33.21918,33.21918,0,0,1,19.36353-25.957,32.30589,32.30589,0,0,1,31.39551,2.46094q.665.44238,1.30517.90332a33.17816,33.17816,0,0,1,12.63648,34.57324c-7.9336,32.45508-10.65869,85.66211-11.12451,95.999a4.46545,4.46545,0,0,1-2.918,4.00489,45.085,45.085,0,0,1-15.22583,2.71094A38.12467,38.12467,0,0,1,839.03523,628.7487Z"
            transform="translate(-190.5 -102.15952)"
            fill={color}
          />
          <path
            d="M869.74507,553.20987a4.4817,4.4817,0,0,1-1.85872-3.40066l-1.70385-30.87614a12.39863,12.39863,0,0,1,24.34643-3.92684l7.48456,27.6049a4.50508,4.50508,0,0,1-3.16562,5.52077l-21.29064,5.77256A4.48286,4.48286,0,0,1,869.74507,553.20987Z"
            transform="translate(-190.5 -102.15952)"
            fill={color}
          />
          <circle cx="659.35689" cy="353.10838" r="24.56103" fill="#ffb8b8" />
          <path
            d="M803.652,551.94177a12.38772,12.38772,0,0,1-7.67895-2.647l-41.7876-32.9668a10.233,10.233,0,0,1-1.03638.30567,11.02131,11.02131,0,0,1-8.81787-1.69141,10.91153,10.91153,0,0,1-4.62622-7.7334,11.001,11.001,0,0,1,21.635-3.80078h0a10.61856,10.61856,0,0,1,.229,1.45215l42.48121,24.50732,10.572-6.08642,11.71142,15.332L810.839,549.65661A12.37475,12.37475,0,0,1,803.652,551.94177Z"
            transform="translate(-190.5 -102.15952)"
            fill="#ffb8b8"
          />
          <path
            d="M805.5842,527.83731a4.48171,4.48171,0,0,1,1.29314-3.65337l21.86341-21.86849a12.39863,12.39863,0,0,1,19.16808,15.51623l-15.57,23.9922a4.50509,4.50509,0,0,1-6.22448,1.32511L807.6101,531.14045A4.48284,4.48284,0,0,1,805.5842,527.83731Z"
            transform="translate(-190.5 -102.15952)"
            fill={color}
          />
          <path
            d="M856.75845,478.23962a3.97442,3.97442,0,0,0,5.69016.32692,44.42586,44.42586,0,0,0,12.67228-16.54878c3.19306-7.611,3.661-16.899.027-24.03305-3.072-6.03078-8.58662-9.86968-14.09195-13.00724a22.99335,22.99335,0,0,0-6.84781-2.89428,8.99361,8.99361,0,0,0-7.154,1.40677,7.54425,7.54425,0,0,0-2.878,7.22724,22.35408,22.35408,0,0,0-9.80208-7.35654,11.36521,11.36521,0,0,0-7.55375-.50594c-3.53554,1.18009-6.15253,4.75026-7.60882,8.58606a19.14084,19.14084,0,0,0-1.25546,9.26372,11.12859,11.12859,0,0,0,4.2691,7.67143c2.88387,1.98988,6.59928,1.78778,9.95313.90708s6.60888-2.37392,10.02126-2.79024,7.19423.48629,9.22732,3.52991c1.43176,2.14338,1.7693,4.96687,2.06144,7.65827l1.51947,13.99863a18.54776,18.54776,0,0,0,1.27762,5.83956A3.25061,3.25061,0,0,0,856.75845,478.23962Z"
            transform="translate(-190.5 -102.15952)"
            fill="#2f2e41"
          />
        </svg>
        {loading ? (
          <div className="absolute left-[49%] top-[50%] translate-x-[-49%] translate-y-[-50%]">
            <Spinner label="" />
          </div>
        ) : (
          <span
            dangerouslySetInnerHTML={{ __html: qrcode }}
            className="w-[185px] h-[185px] p-0 absolute left-[47%] top-[50%] translate-x-[-47%] translate-y-[-50%]"
          />
        )}
      </div>
    );
  };

  const step3 = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 443.57 607.17"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="m392.63,606.19h-193.12c-28.09,0-50.94-22.85-50.94-50.94V50.94c0-28.09,22.85-50.94,50.94-50.94h193.12c28.09,0,50.94,22.85,50.94,50.94v504.31c0,28.09-22.85,50.94-50.94,50.94Z"
          fill="#dadbdc"
          stroke-width="0"
        />
        <path
          d="m392.77,592.4h-193.4c-20.79,0-37.71-16.92-37.71-37.71V50.51c0-20.79,16.92-37.71,37.71-37.71h193.4c20.79,0,37.71,16.92,37.71,37.71v504.18c0,20.79-16.92,37.71-37.71,37.71Z"
          fill="#fff"
          stroke-width="0"
        />
        <path
          d="m323.42,46.36h-54.69c-7.22,0-13.09-5.87-13.09-13.09s5.87-13.09,13.09-13.09h54.69c7.22,0,13.09,5.87,13.09,13.09s-5.87,13.09-13.09,13.09Z"
          fill="#dadbdc"
          stroke-width="0"
        />
        <path
          d="m379.23,200.32h-160.03c-3.17,0-5.75-3.28-5.75-7.3s2.58-7.3,5.75-7.3h160.03c3.17,0,5.75,3.28,5.75,7.3s-2.58,7.3-5.75,7.3Z"
          fill="#dadbdc"
          stroke-width="0"
        />
        <path
          d="m379.23,232.67h-160.03c-3.17,0-5.75-3.28-5.75-7.3s2.58-7.3,5.75-7.3h160.03c3.17,0,5.75,3.28,5.75,7.3s-2.58,7.3-5.75,7.3Z"
          fill="#dadbdc"
          stroke-width="0"
        />
        <path
          d="m333.34,265.02h-114.14c-3.17,0-5.75-3.28-5.75-7.3s2.58-7.3,5.75-7.3h114.14c3.17,0,5.75,3.28,5.75,7.3s-2.58,7.3-5.75,7.3Z"
          fill="#dadbdc"
          stroke-width="0"
        />
        <circle
          cx="296.07"
          cy="386.91"
          r="68.31"
          fill={color}
          stroke-width="0"
        />
        <path
          d="m277.9,388.33c3.53,6.91,7.06,13.83,10.59,20.74,1.01,1.99,3.98,1.36,4.57-.6,4.63-15.44,13.23-29.51,24.82-40.7,2.32-2.24-1.22-5.77-3.54-3.54-12.2,11.78-21.23,26.67-26.11,42.91l4.57-.6c-3.53-6.91-7.06-13.83-10.59-20.74-1.46-2.87-5.78-.34-4.32,2.52h.01Z"
          fill="#fff"
          stroke-width="0"
        />
        <polygon
          points="111.92 304.28 95.36 309.93 95.1 286.02 110.17 285.85 111.92 304.28"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <circle
          cx="97.04"
          cy="276.06"
          r="16.56"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <path
          d="m101.57,274.37c-2.77-.05-4.62-2.83-5.73-5.38-1.11-2.54-2.25-5.47-4.82-6.5-2.11-.84-5.75,5.03-7.43,3.5-1.75-1.6-.15-9.94,1.67-11.45s4.33-1.83,6.69-1.97c5.77-.33,11.57.07,17.24,1.19,3.5.69,7.12,1.75,9.67,4.25,3.23,3.17,4.1,8,4.38,12.52.29,4.62.07,9.47-2.13,13.55-2.21,4.07-6.88,7.11-11.41,6.13-.48-2.45-.05-4.97.1-7.47.15-2.49-.07-5.18-1.61-7.15s-4.8-2.72-6.55-.94"
          fill="#2f2e43"
          stroke-width="0"
        />
        <path
          d="m122,279.88c1.64-1.23,3.61-2.27,5.65-2.04,2.21.24,4.09,2.04,4.68,4.18s-.02,4.51-1.36,6.28-3.35,2.95-5.49,3.55c-1.24.35-2.59.5-3.78,0-1.75-.73-2.71-2.94-2.05-4.72"
          fill="#2f2e43"
          stroke-width="0"
        />
        <path
          id="uuid-aacd27ab-43c3-4d3d-aa57-4e8c94c3c81e-631"
          d="m60.38,436.33c-1.04,5.45,1.03,10.4,4.64,11.05,3.6.65,7.37-3.25,8.41-8.7.45-2.17.35-4.42-.29-6.55l12.74-85.41-17.16-3.03-5.65,86.63c-1.38,1.77-2.31,3.83-2.69,6.02h0Z"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <path
          d="m95.06,298.96l-11.69.13c-8.25,1.34-10.45,5.78-12.23,13.94-2.73,12.45-6.21,29.04-5.48,29.27,1.17.38,21.17,9.52,31.29,7.26l-1.89-50.6Z"
          fill={color}
          stroke-width="0"
        />
        <rect
          x="93.98"
          y="570.5"
          width="15.56"
          height="22.07"
          transform="translate(-6.49 1.17) rotate(-.64)"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <path
          d="m79.06,606.19c-1.64.02-3.09,0-4.19-.09-4.14-.33-8.11-3.34-10.12-5.1-.9-.79-1.2-2.07-.75-3.17h0c.32-.79.98-1.39,1.8-1.64l10.89-3.24,17.55-12.13.2.35c.08.13,1.85,3.24,2.45,5.35.23.8.18,1.47-.15,1.99-.23.36-.55.57-.81.7.32.33,1.33,1,4.43,1.46,4.51.67,5.42-4.02,5.45-4.22l.03-.16.13-.09c2.13-1.41,3.44-2.05,3.9-1.92.29.08.76.22,2.18,12.94.13.4,1.06,3.32.48,6.13-.63,3.06-13.96,2.15-16.62,1.94-.08.01-10.04.83-16.87.9h.02Z"
          fill="#2f2e43"
          stroke-width="0"
        />
        <rect
          x="145.13"
          y="555"
          width="15.56"
          height="22.07"
          transform="translate(-280.8 171.48) rotate(-32.59)"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <path
          d="m136.51,602.52c-1.83.02-3.51-.18-4.71-.38-1.18-.2-2.11-1.12-2.31-2.3h0c-.15-.85.1-1.7.66-2.34l7.52-8.51,8.47-19.58.36.19c.13.07,3.28,1.77,4.91,3.24.62.56.93,1.15.93,1.77,0,.43-.16.78-.32,1.02.45.11,1.66.14,4.53-1.11,4.18-1.82,2.47-6.28,2.39-6.46l-.06-.15.07-.14c1.06-2.32,1.84-3.56,2.29-3.7.29-.08.76-.22,8.7,9.82.32.27,2.66,2.25,3.65,4.94,1.08,2.93-10.7,9.21-13.08,10.44-.07.06-12.38,9.21-17.44,11.83-2.01,1.04-4.4,1.38-6.58,1.4l.02.02h0Z"
          fill="#2f2e43"
          stroke-width="0"
        />
        <path
          d="m118.79,385.68l-43.56.48-3.5,40.56,18.96,149.54,22.24-.25-9.85-86.38,36.94,77.68,19.61-14.06-28.98-72.58s9.36-63.61,1.28-79.34-13.13-15.67-13.13-15.67v.02h0Z"
          fill="#2f2e43"
          stroke-width="0"
        />
        <polygon
          points="140.48 387.91 71.3 388.68 91.06 299.01 121.21 298.67 140.48 387.91"
          fill={color}
          stroke-width="0"
        />
        <path
          id="uuid-36382701-bf34-46f2-bbf2-9fa794ab079f-632"
          d="m147.24,435.37c1.16,5.43-.8,10.42-4.39,11.15-3.59.73-7.44-3.08-8.6-8.51-.5-2.16-.45-4.41.14-6.56l-14.64-85.11,17.09-3.41,7.57,86.49c1.42,1.74,2.39,3.78,2.83,5.96h0Z"
          fill="#f3a3a6"
          stroke-width="0"
        />
        <path
          d="m109.52,298.8l11.69-.13c8.28,1.16,10.57,5.55,12.54,13.67,3,12.39,6.85,28.89,6.13,29.14-1.17.4-20.95,9.98-31.12,7.95l.77-50.63h-.01Z"
          fill={color}
          stroke-width="0"
        />
        <path
          d="m215.08,606.19c0,.54-.44.98-.98.98H.98c-.54,0-.98-.44-.98-.98s.44-.98.98-.98h213.12c.54,0,.98.44.98.98h0Z"
          fill="#3f3d58"
          stroke-width="0"
        />
      </svg>
    );
  };

  const render = {
    1: step1,
    2: step2,
    3: step3,
  };

  return <div>{render[step as keyof typeof render]?.()}</div>;
}

export default PaymentStep;
