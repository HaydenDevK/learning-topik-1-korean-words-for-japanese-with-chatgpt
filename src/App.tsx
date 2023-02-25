import { useCallback, useEffect, useState } from "react";
import "./App.css";

interface TableData {
  korean: string;
  translation: string;
  pronunciationEng: string;
  pronunciationJpn: string;
  examples: {
    korean: string;
    translation: string;
    pronunciationEng: string;
    pronunciationJpn: string;
  }[];
  isChecked: boolean;
}

const data: TableData[] = [
  {
    korean: "고양이",
    translation: "猫",
    pronunciationEng: "goyang-i",
    pronunciationJpn: "ゴヤンイ",
    examples: [
      {
        korean: "제 친구는 고양이를 키워요.",
        translation: "私の友達は猫を育てています。",
        pronunciationEng: "je chinguneun goyang-ireul kiwoyo",
        pronunciationJpn: "チングヌン ゴヤンイル キウォヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "개",
    translation: "犬",
    pronunciationEng: "gae",
    pronunciationJpn: "ゲ",
    examples: [
      {
        korean: "이 동네에는 많은 개가 있어요.",
        translation: "この地域にはたくさんの犬がいます。",
        pronunciationEng: "i dongneeneun manheun gaega isseoyo",
        pronunciationJpn: "イドンネエン マンフン ゲガ イッソヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "책",
    translation: "本",
    pronunciationEng: "chaeg",
    pronunciationJpn: "チェグ",
    examples: [
      {
        korean: "저는 책을 읽는 것을 좋아해요.",
        translation: "私は本を読むことが好きです。",
        pronunciationEng: "jeoneun chaeg-eul ilgeun geoseul johahaeyo",
        pronunciationJpn: "ジョヌン チェグウル イルグン ゴスル ジョハヘヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "학교",
    translation: "学校",
    pronunciationEng: "hakgyo",
    pronunciationJpn: "ハクギョ",
    examples: [
      {
        korean: "학교에서 수업을 들어요.",
        translation: "学校で授業を受けます。",
        pronunciationEng: "hakgyoeseo sueob-eul deul-eoyo",
        pronunciationJpn: "ハクギョエソ スオブウル トゥルオヨ",
      },
      {
        korean: "저는 학교에 가요.",
        translation: "私は学校に行きます。",
        pronunciationEng: "jeoneun hakgyoe gayo",
        pronunciationJpn: "ジョヌン ハッキョエ カヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "음식",
    translation: "食べ物",
    pronunciationEng: "eumsig",
    pronunciationJpn: "ウムシク",
    examples: [
      {
        korean: "이 음식은 정말 맛있어요.",
        translation: "この食べ物は本当に美味しいです。",
        pronunciationEng: "i eumsigeun jeongmal masisseoyo",
        pronunciationJpn: "イウムシグン ジョンマル マシッソヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "커피",
    translation: "コーヒー",
    pronunciationEng: "keopi",
    pronunciationJpn: "コーヒ",
    examples: [
      {
        korean: "아침에 커피를 마셔요.",
        translation: "朝コーヒーを飲みます。",
        pronunciationEng: "achime keopileul masyeoyo",
        pronunciationJpn: "アチメ ケオピル マショヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "사과",
    translation: "林檎",
    pronunciationEng: "sagwa",
    pronunciationJpn: "サグァ",
    examples: [
      {
        korean: "사과를 먹고 싶어요.",
        translation: "りんごを食べたいです。",
        pronunciationEng: "sagwareul meokgo sip-eoyo",
        pronunciationJpn: "サグァルル モッコ シプエヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "버스",
    translation: "バス",
    pronunciationEng: "beoseu",
    pronunciationJpn: "ベオス",
    examples: [
      {
        korean: "버스를 타러 가요",
        translation: "バスに乗りに行きます。",
        pronunciationEng: "beoseuleul taleo gayo",
        pronunciationJpn: "ベオスルル タラオ ガ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "지하철",
    translation: "地下鉄",
    pronunciationEng: "jihacheol",
    pronunciationJpn: "ジハチョル",
    examples: [
      {
        korean: "지하철을 타면 어디에 가요?",
        translation: "地下鉄に乗ったらどこに行きますか？",
        pronunciationEng: "jihacheol-eul tamyeon eodie gayo",
        pronunciationJpn: "ジハチョルウル タミョン オデ ガヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "버튼",
    translation: "ボタン",
    pronunciationEng: "beoteun",
    pronunciationJpn: "ボタン",
    examples: [
      {
        korean: "이 버튼을 누르세요.",
        translation: "このボタンを押してください。",
        pronunciationEng: "i beoteun-eul nuleuseyo",
        pronunciationJpn: "イ ボタンウル ヌルセヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "핸드폰",
    translation: "携帯電話",
    pronunciationEng: "haendeupon",
    pronunciationJpn: "ハエンドゥポン",
    examples: [
      {
        korean: "핸드폰 번호를 알아요?",
        translation: "携帯番号を知っていますか？",
        pronunciationEng: "haendeupon beonholeul al-ayo",
        pronunciationJpn: "ハエンドゥポン ベオンホルル アラヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "우유",
    translation: "牛乳",
    pronunciationEng: "uyu",
    pronunciationJpn: "ウユ",
    examples: [
      {
        korean: "우유를 마셔도 되나요?",
        translation: "牛乳を飲んでもいいですか？",
        pronunciationEng: "uyureul masyeodo doenayo",
        pronunciationJpn: "ウユルル マショド ウェドナヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "학생",
    translation: "学生",
    pronunciationEng: "haksaeng",
    pronunciationJpn: "ハクセン",
    examples: [
      {
        korean: "저는 학생입니다.",
        translation: "私は学生です。",
        pronunciationEng: "jeoneun haksaengimnida",
        pronunciationJpn: "ジョヌン ハクセンインニダ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "사람",
    translation: "人",
    pronunciationEng: "saram",
    pronunciationJpn: "サラム",
    examples: [
      {
        korean: "이 공원에는 많은 사람들이 있어요.",
        translation: "この公園には多くの人がいます。",
        pronunciationEng: "i gong-woneun manheun saramdeuri isseoyo",
        pronunciationJpn: "イ ゴンウォヌン マヌン サラムドゥリ イッソヨ",
      },
      {
        korean: "이곳에는 사람이 많아요.",
        translation: "ここにはたくさんの人がいます。",
        pronunciationEng: "igoseneun saram-i manh-ayo",
        pronunciationJpn: "イゴセヌン サラミ マンハヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "의사",
    translation: "医者",
    pronunciationEng: "uisa",
    pronunciationJpn: "ウィサ",
    examples: [
      {
        korean: "제 친구는 의사입니다.",
        translation: "私の友達は医者です。",
        pronunciationEng: "je chinguneun uisaimnida",
        pronunciationJpn: "ジェ チングヌン ウィサインニダ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "식당",
    translation: "レストラン",
    pronunciationEng: "siktang",
    pronunciationJpn: "シクタン",
    examples: [
      {
        korean: "오늘 저녁에 식당에 가요.",
        translation: "今晩はレストランに行きます。",
        pronunciationEng: "oneul jeonyeok-e siktang-e gayo",
        pronunciationJpn: "オヌル ジョニョケ シクタンエ カヨ",
      },
    ],
    isChecked: false,
  },
  {
    korean: "국가",
    translation: "国家",
    pronunciationEng: "gukga",
    pronunciationJpn: "クッカ",
    examples: [
      {
        korean: "한국은 민주주의 국가입니다.",
        translation: "韓国は民主主義国家です。",
        pronunciationEng: "hangugeun minjujuui gukgaimnida",
        pronunciationJpn: "ハングギュン ミンジュジュイ クッカインニダ",
      },
    ],
    isChecked: false,
  },
];

function App() {
  const [tableRows, setTableRows] = useState<TableData[]>(data);

  const onCheckboxClick = useCallback(
    (index: number) => {
      const newTableRow = tableRows.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      );
      // TODO 뭐가 더 나은지
      // const newTableRow = [...tableRows];
      // newTableRow[index].isChecked = !newTableRow[index].isChecked;

      setTableRows(newTableRow);
      localStorage.setItem("koreanList", JSON.stringify(newTableRow));
    },
    [tableRows]
  );

  useEffect(() => {
    // 최초 렌더링 시 로컬스토리지에 저장된 값이 있으면 리스트에 set
    const localList = localStorage.getItem("koreanList");
    if (localList) setTableRows(JSON.parse(localList));
  }, []);

  return (
    <div className="App">
      <header className="App-header">TOPIK 1</header>
      <section className="Table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Korean</th>
              <th>Translation (with Japanese)</th>
              <th>Pronunciation (English)</th>
              <th>Pronunciation (Japanese Katakana)</th>
              <th>examples S[entence</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.korean}</td>
                <td>{item.translation}</td>
                <td>{item.pronunciationEng}</td>
                <td>{item.pronunciationJpn}</td>
                <td>
                  {item.examples.map((example, index) => (
                    <div className="Example-wrapper">
                      <p key={index}>{example.korean}</p>
                      <p>{example.translation}</p>
                      <p>
                        <em>{example.pronunciationEng}</em>
                      </p>
                      <p>
                        <em>{example.pronunciationJpn}</em>
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => {
                      onCheckboxClick(index);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
