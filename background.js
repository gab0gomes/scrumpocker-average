chrome.runtime.onInstalled.addListener(() => {
  chrome.scripting.registerContentScript({
    id: 1,
    matches: ['https:/\/???.scrumpoker-online.org/en/room/*'],
    run_at: 'document_idle',
    js: ['contentScript.js']
  });
});
